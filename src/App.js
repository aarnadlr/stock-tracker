import React from 'react';
import './App.scss';
import { openOrClosed } from './utils/isOpenOrClosed';
import Moment from 'react-moment';

function App() {
  return (
    <div className="App">
      <p>
        Today is{' '}
        <strong>
          <Moment date={Date.now()} format="dddd" />
        </strong>{' '}
        and the market is <strong>{openOrClosed}</strong>
      </p>
    </div>
  );
}

export default App;
