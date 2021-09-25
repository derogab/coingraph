import React from 'react';
import { Col } from 'antd';

import 'antd/dist/antd.css';
import './index.scss';

export function CashData({data, value}) {

  data = '$' + data.toFixed(2);

  return (
    <Col span={12}>
      <div className="box-data nohill">
        <h6>{value}</h6>
        <h1>{data}</h1>
      </div>
    </Col>
  )
}

export function PercentageData({data, value}) {

  var hill = 'nohill';
  if(data > 0) hill = 'uphill';
  if(data < 0) hill = 'downhill'

  data = data.toFixed(2) + '%';

  return (
    <Col span={12}>
      <div className={"box-data " + hill}>
        <h6>{value}</h6>
        <h1>{data}</h1>
      </div>
    </Col>
  )
}