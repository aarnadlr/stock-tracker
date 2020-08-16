import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Home({
  apiData,
  handleInputChange,
  query,
  handleClick,
  favorites,
  handleClearFavorites,
}) {
  return (
    <div className="Home">
      <div
        style={{
          width: '200px',
          border: '1px solid gray',
          padding: '16px',
          margin: '16px auto',
        }}
      >

        {/* if there are favorite stocks in the favorites array, list them out */}
        {favorites && favorites.length >= 1 ? (
          <>
            <span>Your Favorite Stocks:</span>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {favorites.map((item, index) => (
                <Link key={index} to={`/${item}`}>
                  <li style={{ fontSize: '20px' }}>
                    <strong>{item}</strong>
                  </li>
                </Link>
              ))}
            </ul>
          </>
        ) : (

          // if the favorites array is empty, render this guidance
          <span>Your Favorite Stocks will appear here</span>
        )}
      </div>


      {/* show this 'clear' button only if there are items in the favorites array */}
      {favorites && favorites.length >= 1 && (
        <button onClick={handleClearFavorites} style={{ fontSize: '13px' }}>
          Clear your favorites
        </button>
      )}


      {/* form with an input and submit button  */}
      <form style={{ padding: '48px 0 0 0' }}>
        <label htmlFor="query">
          Please enter a stock symbol. Filtered results will appear below.
        </label>
        <br />
        <input
          style={{
            width: '300px',
            height: '40px',
            margin: '8px 0 0 0',
            padding: '8px',
            fontSize: '20px',
          }}
          // user text input passed down from state, for render here inside input
          value={query}
          // when user types, grab user input and save to state
          onChange={handleInputChange}
          type="text"
          name="query"
          id="query"
        />
        <br />
        <button
          // when user clicks submit, make API request. Save API response to state
          onClick={handleClick}
          style={{ width: '300px', height: '40px', margin: '8px 0 0 0' }}
          type="submit"
        >
          SUBMIT
        </button>
      </form>

      <ul
        className={'Home__results'}
        style={{
          listStyle: 'none',
          margin: '16px',
          padding: 0,
          fontSize: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* if an API request has been made, show the stock results based on the user's query */}
        {apiData &&
          apiData.bestMatches.map((item, index) => (
            <Link
              to={`/${item && item['1. symbol']}`}
              key={index}
              style={{ textDecoration: 'none' }}
            >
              <li
                style={{
                  margin: '0px',
                  padding: '16px',
                  width: '300px',
                  border: '1px solid lightslategray',
                  borderBottom: 0,
                  textDecoration: 'none',
                }}
              >
                {/* render stock symbol  */}
                {item && item['1. symbol']}
              </li>
            </Link>
          ))}
      </ul>

      {/* if there are no results, render an error message */}
      {apiData && apiData.bestMatches.length <= 0 && (
        <p style={{ fontWeight: 600, color: 'red' }}>
          Error. Your query returned no results.{' '}
        </p>
      )}
    </div>
  );
};

Home.propTypes = {
  apiData:PropTypes.object,
  favorites:PropTypes.array,
  handleFavoriteClick: PropTypes.func,
  handleInputChange: PropTypes.func,
  query: PropTypes.string,
  handleClick: PropTypes.func,
  handleClearFavorites: PropTypes.func,
};
