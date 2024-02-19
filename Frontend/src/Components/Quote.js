import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quote = () => {
  const [city, setCity] = useState('');
  const [squareMeters, setSquareMeters] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quote, setQuote] = useState(null);

useEffect(() => {
const fetchOptions = async () => {
    if (city)
    {
        const response = await axios.get(`https://localhost:7269/api/QuoteService/options/${city}`);
        setOptions(response.data);
    }
};
fetchOptions();
}, [city]);

const handleCityChange = (e) => {
    setCity(e.target.value);
};

const handleSquareMetersChange = (e) => {
    setSquareMeters(e.target.value);
};

  const handleOptionChange = (e) => {
    const option = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
    }
  };

  const calculateQuote = async () => {
    try {
      const response = await axios.post('https://localhost:7269/api/QuoteService/calculate', {
        city,
        squareMeters: parseFloat(squareMeters),
        options: selectedOptions
      });
  
      console.log('Response:', response); 
  
      if (response.data && typeof response.data === 'number') {
        setQuote(response.data);
      } else {
        console.error('Invalid response format:', response.data);
        setQuote(null);
      }
    } catch (error) {
      console.error('Error calculating quote:', error);
      setQuote(null);
    }
  };
  
  return (
    <div className='quote-container'>
      <label>
        Choose City:
        <select value={city} onChange={handleCityChange}>
          <option value="">Select City</option>
          <option value="Stockholm">Stockholm</option>
          <option value="Uppsala">Uppsala</option>
        </select>
      </label>
      <br />
      <label>
        Square Meters:
        <input type="number" value={squareMeters} onChange={handleSquareMetersChange} />
      </label>
      <br />
      {options.map((opt) => (
        <label key={opt}>
          <input type="checkbox" value={opt} onChange={handleOptionChange} />
          {opt}
        </label>
      ))}
      <br />
      <button className="calculate-button" onClick={calculateQuote}>Calculate Quote</button> 
      {quote !== null ? (
        <p>Quote: {quote} SEK</p>
      ) : (
        <p>No quote available</p>
      )}
    </div>
  );
};

export default Quote;

