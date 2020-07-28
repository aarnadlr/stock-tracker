import React from 'react';
import { render } from '@testing-library/react';
import StockPage from './StockPage';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const apiData = {
  bestMatches: [
    {
      '1. symbol': 'BA',
      '2. name': 'The Boeing Company',
      '3. type': 'Equity',
      '4. region': 'United States',
      '5. marketOpen': '09:30',
      '6. marketClose': '16:00',
      '7. timezone': 'UTC-05',
      '8. currency': 'USD',
      '9. matchScore': '1.0000',
    },
    {
      '1. symbol': 'TSN',
      '2. name': 'Tyson Foods Inc.',
      '3. type': 'Equity',
      '4. region': 'United States',
      '5. marketOpen': '09:30',
      '6. marketClose': '16:00',
      '7. timezone': 'UTC-05',
      '8. currency': 'USD',
      '9. matchScore': '0.8000',
    },
  ],
};

const favorites = ['TSN'];
const handleFavoriteClick = jest.fn();

const history = createMemoryHistory();
const route = '/TSN';
history.push(route);

test('StockPage is in the document', () => {

  const { container } = render(
    <Router history={history}>
      <StockPage
        apiData={apiData}
        favorites={favorites}
        handleFavoriteClick={handleFavoriteClick}
      />
    </Router>
  );
  expect(container.firstChild).toBeInTheDocument();
});

test('StockPage is visible', () => {
  const { container } = render(
    <Router history={history}>
    <StockPage
      apiData={apiData}
      favorites={favorites}
      handleFavoriteClick={handleFavoriteClick}
    />
    </Router>
  );
  expect(container.firstChild).toBeVisible();
});
