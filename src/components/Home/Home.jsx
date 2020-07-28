import React from 'react';
import { Link } from 'react-router-dom';

export default function Home({
  saveSelectedItem,
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
          <span>Your Favorite Stocks will appear here</span>
        )}
      </div>

      {favorites && favorites.length >= 1 && (
        <button onClick={handleClearFavorites} style={{ fontSize: '13px' }}>
          Clear your favorites
        </button>
      )}

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
        {apiData &&
          apiData.bestMatches.map((item, index) => (
            <Link
              onClick={() => saveSelectedItem(item)}
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
                {item && item['1. symbol']}
              </li>
            </Link>
          ))}
      </ul>

      {apiData && apiData.bestMatches.length <= 0 && (
        <p style={{ fontWeight: 600, color: 'red' }}>
          Error. Your query returned no results.{' '}
        </p>
      )}
    </div>
  );
}
