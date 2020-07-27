import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';

export default function StockPage() {
  let { symbol } = useParams();

  const [apiData, setApiData] = useState();

  const apikey = '2PMRI8QK3GQP6LUL';
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`

  useEffect(()=>{
    fetch(url)
      .then((res) => res.json())
      .then((data) => setApiData(data));

  },[]);
  
  return (
    <>
      <div style={{ margin: '40px 0' }}>
        This is the stock page for stock symbol:
      </div>

      <h1 style={{ margin: '40px 0' }}>{symbol.toUpperCase()}</h1>

  <h4>Opening price: { apiData && apiData['Global Quote']['02. open'] }</h4>
  <h4>Current price: { apiData && apiData['Global Quote']['05. price'] }</h4>
  <h4>Previous closing price: { apiData && apiData['Global Quote']['08. previous close'] }</h4>

      <br/>
      <Link to="/">Back Home</Link>
    </>
  );
}
