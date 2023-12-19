import React, { useState, useEffect } from 'react';
import './bitcoin.css';

const Bitcoin = () => {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(null);

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const currentPriceResponse = await fetch('https://api.blockchain.info/q/24hrprice');
        const currentPriceData = await currentPriceResponse.json();
        setCurrentPrice(currentPriceData);
        const priceChangeResponse = await fetch('https://api.blockchain.info/charts/market-price?timespan=5days&format=json&cors=true');
        const priceChangeData = await priceChangeResponse.json();
        const { values } = priceChangeData;
        const firstValue = values[0].y;
        const lastValue = values[values.length - 1].y;
        const change = lastValue - firstValue;
        setPriceChange(change);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchBitcoinData();
  }, []);

  return (
    <div>
      <h2>Bitcoin Cotação Atual</h2>
      <div>
        <p>
          Valor atual (em Dolar): {currentPrice !== null ? currentPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'Loading'}
          <br />
          <br />
          Variação de valor (Últimos 5 dias): ${priceChange !== null ? priceChange.toFixed(2).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'Loading'}
        </p>
      </div>
    </div>
  );
};

export default Bitcoin;
