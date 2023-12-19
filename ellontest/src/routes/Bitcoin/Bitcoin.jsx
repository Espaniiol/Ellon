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
        console.error('Error fetching Bitcoin data:', error);
      }
    };

    fetchBitcoinData();
  }, []);

  return (
    <div>
      <h2>Bitcoin Atualizado</h2>
      <div>
       <p>
         Valor atual (em Dolar) : {currentPrice} USD
           <br />
           <br />
         Variação de valor (Ultimos 5 dias) : {priceChange !== null ? priceChange.toFixed(2) : 'Loading'} USD
        </p>
      </div>

    </div>
  );
};

export default Bitcoin;
