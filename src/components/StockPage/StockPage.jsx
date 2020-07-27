import React from 'react'
import {
  Link,
  useParams
} from "react-router-dom";

export default function StockPage() {

  let { symbol } = useParams();

  return (
    <div style={{margin:'40px 0 0 0'}}>
      This is the stock page for stock symbol <strong>{ symbol.toUpperCase() }</strong>
    </div>
  )
}
