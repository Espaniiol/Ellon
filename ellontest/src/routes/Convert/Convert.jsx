import React, { useState, useEffect } from 'react';
import './convert.css';

const Convert = () => {


  const API_KEY = '843f875f7a6668c5671bffac62f1bf83';

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(`http://api.currencylayer.com/list?access_key=${API_KEY}`);
        if (response.ok) {
          const data = await response.json();
          setCurrencies(Object.keys(data.currencies));
        } else {
          console.error('Erro');
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchCurrencies();
  }, [API_KEY]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(`http://api.currencylayer.com/live?access_key=${API_KEY}&currencies=${fromCurrency},${toCurrency}`);
        if (response.ok) {
          const data = await response.json();
          setExchangeRates(data.quotes);
        } else {
          console.error('Erro');
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchExchangeRates();
  }, [fromCurrency, toCurrency, API_KEY]);

  useEffect(() => {
    if (exchangeRates && fromCurrency !== toCurrency) {
      const conversionRate = exchangeRates[`${fromCurrency}${toCurrency}`];
      setConvertedAmount((amount * conversionRate).toFixed(2));
    } else {
      setConvertedAmount(null);
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  return (
    <div>
      <h2>Converter Moeda</h2>
      <div>
        <label>
          Valor:
        </label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>
      <div className="currency-container">
        <label>
         Selecione a moeda de Origem:
          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
        <label>
          Selecione a moeda de destino:
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <p>
          {amount} {fromCurrency} é equivalente à {convertedAmount} {toCurrency}
        </p>
      </div>
    </div>
  );
};

export default Convert;
