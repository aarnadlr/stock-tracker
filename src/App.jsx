import React from 'react';
import './App.scss';
import { openOrClosed } from './utils/isOpenOrClosed';
import Moment from 'react-moment';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import StockPage from './components/StockPage/StockPage';
import createPersistedState from 'use-persisted-state';
const usePersistedQueryState = createPersistedState('query');
const usePersistedApiDataState = createPersistedState('apiData');
const usePersistedFavoritesState = createPersistedState('favorites');

const apikey = '2PMRI8QK3GQP6LUL';

function App() {
  
  // user text input
  const [query, setQuery] = usePersistedQueryState('');


  // user text value populates the API query
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${
    query ? query : '123456'
  }&apikey=${apikey}`;


  // data fetched on click, saved here
  const [apiData, setApiData] = usePersistedApiDataState(null);


  // array of stock symbols
  const [favorites, setFavorites] = usePersistedFavoritesState([]);


  // user text input saved to `query` state
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };


  // when user clicks submit, make API request. Save response to state
  const handleClick = (e) => {
    e.preventDefault();
    fetch(url)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  };


  // when user clicks button to Favorite / Unfavorite, add or remove to favorites 
  const handleFavoriteClick = (symbol) => {

    // if it's already favorited, filter that stock out
    if (favorites && favorites.includes(symbol)) {
      setFavorites([
        // only return stocks which are not this specific stock
        ...favorites.filter((item) => {
          return item !== symbol;
        }),
      ]);
    } else {
      // If its not already in Favorites, add it
      setFavorites([...favorites, symbol]);
    }
  };

  // when user clicks "Clear your favorites" button
  const handleClearFavorites = () => {
    setFavorites([]);
  };

  return (
    <Router>
      <div className="App">

        {/* NAVBAR ON ALL RENDERED ROUTES */}
        <div style={{ backgroundColor: '#eff3f6', padding: '16px', margin: 0 }}>
          Today is{' '}
          <strong>
            {/* render today's day of the week */}
            <Moment date={Date.now()} format="dddd" />
          </strong>{' '}
          and the market is <strong>{openOrClosed}</strong>
        </div>

        <Switch>

          {/* individual dynamic routes for each stock */}
          <Route
            path="/:symbol"
            children={
              <StockPage
                // response from API request
                apiData={apiData}
                // array of favorited stock symbols, for conditional button rendering
                favorites={favorites}
                // func to call when user clicks button to Favorite / Unfavorite, add or remove to favorites
                handleFavoriteClick={handleFavoriteClick}
              />
            }
          />
          
          {/* default: homepage */}
          <Route path="/">
            <Home
              // grab user input and save to state
              handleInputChange={handleInputChange}
              // user text input passed down from state, for render inside input
              query={query}
              // response from API request
              apiData={apiData}
              // func to call on click
              handleClick={handleClick}
              // array of favorited stock symbols
              favorites={favorites}
              // func to clear array of favorites values
              handleClearFavorites={handleClearFavorites}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
