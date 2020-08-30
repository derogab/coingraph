import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types'
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip
} from 'recharts';

import { CashData, PercentageData } from './ColumnData'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    var price = payload[0].value;
    var time = label;
      var ts = new Date(time);

    return (
      <div className="custom-tooltip">
        <p>
          The value was
          <h4>{`$${price.toFixed(2)}`}</h4>
          on {`${ts.toUTCString()}`}
        </p>
      </div>
    );
  }

  return null;
};

function Coin({datagraph, dataset, prefix}) {

  return (
    <div style={{padding: 20}}>
      <header className={`${prefix}-header`}>
      </header>
      <div className={`${prefix}-body`}>

      <Row>
        <Col className="box-graph set-height">
          <ResponsiveContainer>
            <LineChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }} data={datagraph}>
              <XAxis dataKey='time' hide={true} domain={['auto', 'auto']} scale='time' type='number'/>
              <YAxis dataKey='price' hide={false} domain={['auto', 'auto']} />
              <Line type='monotone' dataKey='price' stroke='#ecf0f1' strokeWidth={2} dot={false} isAnimationActive={false} />
              <Tooltip content={<CustomTooltip />} />
            </LineChart>
          </ResponsiveContainer>
        </Col>
        <Col>
          <Row>
              <CashData data={dataset.data1} value={prefix}/>
              <PercentageData data={dataset.data2} value="change last 1h" />
          </Row>
          <Row>
            <PercentageData data={dataset.data3} value="change last 24h" />
            <PercentageData data={dataset.data4} value="change last 7d" />
          </Row>
        </Col>
      </Row>       
      </div>
    </div>

    
  );
}

Coin.propTypes = {
  datagraph: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    time: PropTypes.number
  })),
  prefix: PropTypes.string,
  dataset: PropTypes.shape({
    data1: PropTypes.number,
    data2: PropTypes.number,
    data3: PropTypes.number,
    data4: PropTypes.number
  })
}
Coin.defaultProps = {
  datagraph: [],
  prefix: '',
  dataset: {
    data1: '',
    data2: '',
    data3: '',
    data4: ''
  }
}
export default Coin;
