import React from 'react'
import {Col} from 'react-bootstrap'

import './index.css'

export function CashData({data}) {

  data = '$' + data.toFixed(2);

  return (
    <Col className="box-data nohill">
      <h1>{data}</h1>
    </Col>
  )
}

export function PercentageData({data}) {

  var hill = 'nohill';
  if(data > 0) hill = 'uphill';
  if(data < 0) hill = 'downhill'

  data = data.toFixed(2) + '%';

  return (
    <Col  className={"box-data " + hill}>
      <h1>{data}</h1>
    </Col>
  )
}