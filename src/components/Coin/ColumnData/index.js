import React from 'react'
import {Col} from 'react-bootstrap'

import './index.css'

export function CashData({data, value}) {

  data = '$' + data.toFixed(2);

  return (
    <Col className="box-data nohill">
      <h6>{value}</h6>
      <h1>{data}</h1>
    </Col>
  )
}

export function PercentageData({data, value}) {

  var hill = 'nohill';
  if(data > 0) hill = 'uphill';
  if(data < 0) hill = 'downhill'

  data = data.toFixed(2) + '%';

  return (
    <Col  className={"box-data " + hill}>
      <h6>{value}</h6>
      <h1>{data}</h1>
    </Col>
  )
}