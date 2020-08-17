import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const apikey = '2PMRI8QK3GQP6LUL';

export default function StockPage({ apiData, favorites, handleFavoriteClick }) {
  
  // read the stock symbol the user selected, for making second API call, and for render
  let { symbol } = useParams();

  // save the API response here
  const [globalQuoteData, setGlobalQuoteData] = useState();


  // on mount, make API call #2 for the stock's price data
  useEffect(() => {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setGlobalQuoteData(data));
      // eslint-disable-next-line
  }, []);


  // Get the company name by using the stock symbol
  const getCompanyName = (symbol) => {

    // use the stock symbol to find the matching company object in the API response
    const selectedObj =
      apiData.bestMatches?.find((item) => item['1. symbol'] === symbol);

    // read the company name from the matching object
    const companyName = selectedObj && selectedObj['2. name'];

    return companyName;
  };


  return (
    <>
      <div style={{ margin: '40px 0' }}>
        This is the stock page for stock symbol:
      </div>

      <h1 style={{ margin: '40px 0 8px 0' }}>

        {/* display the user-selected stock symbol */}
        {symbol && symbol.toUpperCase()}
      </h1>

      {/* if the stock has been favorited, show the Unfavorite button */}
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

        // if the stock has not been favorited, show the Favorite button
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

        {/* render company name */}
        Full Company Name: <strong>{getCompanyName(symbol)}</strong>
      </p>

      <p>
        Opening price:{' '}
        <strong>
          {globalQuoteData?.['Global Quote']?.['02. open']}
        </strong>
      </p>

      <p>
        Current price:{' '}
        <strong>
          {globalQuoteData?.['Global Quote']?.['05. price']}
        </strong>
      </p>

      <p>
        Previous closing price:{' '}
        <strong>
          {globalQuoteData?.['Global Quote']?.['08. previous close']}
        </strong>
      </p>

      <br />
      <Link to="/">Back Home</Link>
    </>
  );
};

StockPage.propTypes = {
  apiData:PropTypes.object,
  favorites:PropTypes.array,
  handleFavoriteClick: PropTypes.func
};
