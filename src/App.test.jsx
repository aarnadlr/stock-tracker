import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App component is in the document', () => {
  const { container } = render(<App />);
  expect(container.firstChild).toBeInTheDocument();
});

test('App component is visible', () => {
  const { container } = render(<App />);
  expect(container.firstChild).toBeVisible();
});

test('App component has class "App"', () => {
  const { container } = render(<App />);
  expect(container.firstChild).toHaveClass('App');
});
