import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function StockPage({
  apiData,
  favorites,
  handleFavoriteClick,
}) {
  let { symbol } = useParams();

  const [globalQuoteData, setGlobalQuoteData] = useState();

  const apikey = '2PMRI8QK3GQP6LUL';

  useEffect(() => {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setGlobalQuoteData(data));
  }, []);

  const getCompanyName = (symbol) => {
    const selectedObj =
      apiData &&
      apiData.bestMatches &&
      apiData.bestMatches.find((item) => item['1. symbol'] === symbol);

    const companyName = selectedObj && selectedObj['2. name'];

    return companyName;
  };

  return (
    <>
      <div style={{ margin: '40px 0' }}>
        This is the stock page for stock symbol:
      </div>

      <h1 style={{ margin: '40px 0 8px 0' }}>{symbol && symbol.toUpperCase()}</h1>

      {favorites && favorites.includes(symbol) ? (
        <button
          onClick={() => handleFavoriteClick(symbol)}
          style={{
            margin: '8px 0',
            backgroundColor: 'white',
            border: '1px solid lightslategray',
            height: '48px',
            width: '260px',
            fontSize: '16px',
          }}
        >
          <span role="img" aria-label="star">
            ⭐️
          </span>{' '}
          Favorited! Click to unfavorite.
        </button>
      ) : (
        <button
          onClick={() => handleFavoriteClick(symbol)}
          style={{
            margin: '8px 0',
            height: '48px',
            width: '190px',
            backgroundColor: 'white',
            border: '1px solid lightslategray',
            fontSize: '16px',
          }}
        >
          Favorite this stock
        </button>
      )}

      <p style={{ margin: '40px 0 0 0' }}>
        {/* Full Company Name: <strong>{selectedItem && selectedItem['2. name']}</strong> */}
        {/* Full Company Name: <strong>{getCompanyName()}</strong> */}
        Full Company Name: <strong>{getCompanyName(symbol)}</strong>
      </p>
      <p>
        Opening price:{' '}
        <strong>
          {globalQuoteData &&
            globalQuoteData['Global Quote'] &&
            globalQuoteData['Global Quote']['02. open']}
        </strong>
      </p>
      <p>
        Current price:{' '}
        <strong>
          {globalQuoteData &&
            globalQuoteData['Global Quote'] &&
            globalQuoteData['Global Quote']['05. price']}
        </strong>
      </p>
      <p>
        Previous closing price:{' '}
        <strong>
          {globalQuoteData &&
            globalQuoteData['Global Quote'] &&
            globalQuoteData['Global Quote']['08. previous close']}
        </strong>
      </p>

      <br />
      <Link to="/">Back Home</Link>
    </>
  );
}
