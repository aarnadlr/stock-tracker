import React, { useEffect } from 'react';
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
const usePersistedSelectedItemState = createPersistedState('selectedItem');

function App() {

  const [query, setQuery] = usePersistedQueryState('');

  // data fetched on click
  const [apiData, setApiData] = usePersistedApiDataState(null);

  // array of stock symbols
  const [favorites, setFavorites] = usePersistedFavoritesState([]);

  const [selectedItem, setSelectedItem] = usePersistedSelectedItemState(null);

  // clear values on mount
  // useEffect(()=>{
    // setQuery('');
    // setApiData(null);
  // },[]);

  const apikey = '2PMRI8QK3GQP6LUL';

  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${
    query ? query : '123456'
  }&apikey=${apikey}`;

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    fetch(url)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  };

  const handleFavoriteClick = (symbol) => {
    if (favorites && favorites.includes(symbol)) {
      setFavorites([
        ...favorites.filter((item) => {
          return item !== symbol;
        }),
      ]);
    } else {
      setFavorites([...favorites, symbol]);
    }
  };

  const handleClearFavorites = () => {
    setFavorites([]);
  };

  const saveSelectedItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <Router>
      <div className="App">
        <p style={{ backgroundColor: '#eff3f6', padding: '16px', margin: 0 }}>
          Today is{' '}
          <strong>
            <Moment date={Date.now()} format="dddd" />
          </strong>{' '}
          and the market is <strong>{openOrClosed}</strong>
        </p>

        <Switch>
          <Route
            path="/:symbol"
            children={
              <StockPage
                apiData={apiData}
                selectedItem={selectedItem}
                favorites={favorites}
                handleFavoriteClick={handleFavoriteClick}
              />
            }
          />

          <Route path="/">
            <Home
              saveSelectedItem={saveSelectedItem}
              apiData={apiData}
              handleInputChange={handleInputChange}
              query={query}
              handleClick={handleClick}
              favorites={favorites}
              handleClearFavorites={handleClearFavorites}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
