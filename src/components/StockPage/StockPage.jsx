import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function StockPage() {
  let { symbol } = useParams();

  return (
    <>
      <div style={{ margin: '40px 0' }}>
        This is the stock page for stock symbol{' '}
      </div>

      <h1 style={{ margin: '40px 0' }}>{symbol.toUpperCase()}</h1>
      <Link to="/">Back Home</Link>
    </>
  );
}
