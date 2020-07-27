import React, { useState } from 'react';
import './App.scss';
import { openOrClosed } from './utils/isOpenOrClosed';
import Moment from 'react-moment';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import StockPage from './components/StockPage/StockPage';

function App() {
  
  const [query, setQuery] = useState('');

  // data fetched on click
  const [apiData, setApiData] = useState();

  // array of stock symbols
  const [favorites, setFavorites] = useState([]);

  const [selectedItem, setSelectedItem] = useState('');

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
    if (favorites.includes(symbol)) {
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
