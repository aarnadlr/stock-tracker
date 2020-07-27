import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function StockPage({ favorites, handleFavoriteClick }) {
  let { symbol } = useParams();

  const [apiData, setApiData] = useState();

  const apikey = '2PMRI8QK3GQP6LUL';
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, []);

  return (
    <>
      <div style={{ margin: '40px 0' }}>
        This is the stock page for stock symbol:
      </div>

      <h1 style={{ margin: '40px 0 8px 0' }}>{symbol.toUpperCase()}</h1>

      {favorites && favorites.includes(symbol) ? (
        <button
        onClick={() => handleFavoriteClick(symbol)}
        style={{ margin: '8px 0', backgroundColor: 'white', border: '1px solid lightslategray', height:'48px', width:'260px', fontSize: '16px'  }}
      >
          <span role="img" aria-label="star">
            ⭐️
          </span>{' '}
          Favorited! Click to unfavorite.
        </button>
      ) : (

        <button
          onClick={() => handleFavoriteClick(symbol)}
          style={{ margin: '8px 0', height:'48px', width:'190px', backgroundColor: 'white', border: '1px solid lightslategray', fontSize: '16px' }}
        >
          Favorite this stock
        </button>

      )}

      <h4 style={{margin:'40px 0 0 0'}}>Opening price: {apiData && apiData['Global Quote']['02. open']}</h4>
      <h4>Current price: {apiData && apiData['Global Quote']['05. price']}</h4>
      <h4>
        Previous closing price:{' '}
        {apiData && apiData['Global Quote']['08. previous close']}
      </h4>

      <br />
      <Link to="/">Back Home</Link>
    </>
  );
}
