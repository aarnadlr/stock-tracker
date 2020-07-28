import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

test('Home component is in the document', () => {
  const { container } = render(<Home />);
  expect(container.firstChild).toBeInTheDocument();
});

test('Home component is visible', () => {
  const { container } = render(<Home />);
  expect(container.firstChild).toBeVisible();
});

test('Home component has class "Home"', () => {
  const { container } = render(<Home />);
  expect(container.firstChild).toHaveClass('Home');
});
