import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home({favorites}) {
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

      <div style={{width:'200px', border:'1px solid gray', padding:'8px', margin:'16px auto'}}>
      <span>Your Favorite Stocks:</span>

      <ul style={{listStyle: 'none', padding: 0}}>
      {
        favorites.map((item, index)=>(
        <li key={index}>{item}</li>
        ))
      }
      </ul>
      </div>

      <form style={{ padding: '40px 0 0 0' }}>
        <label htmlFor="query">Please enter a stock symbol. Filtered results will appear below.</label>
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

      <ul style={{ listStyle: 'none', margin: '16px', padding: 0, fontSize:'20px' }}>
        {apiData &&
          apiData.bestMatches.map((item, index) => (

            <Link to={`/${item && item['1. symbol']}`} key={index}>
              <li style={{ margin: '16px', padding: 0 }} >
                {item && item['1. symbol']}
              </li>
            </Link>

          ))}
      </ul>
    </div>
  );
}
