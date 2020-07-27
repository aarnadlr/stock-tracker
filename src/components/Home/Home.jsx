import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [apiData, setApiData] = useState();
  const [query, setQuery] = useState('');

  const apikey = '2PMRI8QK3GQP6LUL';
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${
    query ? query : 'A'
  }&apikey=${apikey}`;

  const handleClick = (e) => {
    e.preventDefault();

    fetch(url)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <div style={{ padding: '40px 0' }}>This is the homepage.</div>

      <form>
        <label htmlFor="query">Please enter a stock symbol</label>
        <br />
        <input
          style={{
            width: '300px',
            height: '40px',
            margin: '8px 0 0 0',
            padding: '8px',
            fontSize: '20px',
          }}
          value={query}
          onChange={handleInputChange}
          type="text"
          name="query"
          id="query"
        />
        <br />
        <button
          onClick={handleClick}
          style={{ width: '300px', height: '40px', margin: '8px 0 0 0' }}
          type="submit"
        >
          SUBMIT
        </button>
      </form>

      <ul style={{ listStyle: 'none', margin: '16px', padding: 0 }}>
        {apiData &&
          apiData.bestMatches.map((item, index) => (

            <Link to={`/${item && item['1. symbol']}`}>
              <li style={{ margin: '16px', padding: 0 }} key={index}>
                {item && item['1. symbol']}
              </li>
            </Link>
            
          ))}
      </ul>
    </div>
  );
}
