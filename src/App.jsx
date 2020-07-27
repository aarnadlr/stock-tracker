import React from 'react';
import './App.scss';
import { openOrClosed } from './utils/isOpenOrClosed';
import Moment from 'react-moment';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import StockPage from './components/StockPage/StockPage';

function App() {
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

          <Route path="/:symbol" children={<StockPage />} />

          <Route path="/">
            <Home />
          </Route>

          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
