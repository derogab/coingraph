import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types'
import {
  LineChart, Line, ResponsiveContainer
} from 'recharts';

import ColumnData from './ColumnData'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

function Coin({datagraph, dataset, prefix}) {

  return (
    <div style={{padding: 20}}>
      <header className={`${prefix}-header`}>
      </header>
      <div className={`${prefix}-body`}>

      <Row>
        <Col className="with-border set-height">
          <ResponsiveContainer>
            <LineChart margin={{ top: 5, right: 0, left: 0, bottom: 5 }} data={datagraph}>
              <Line type='monotone' dataKey='pv' stroke='#8884d8' strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Col>
        <Col>
          <Row>
              <ColumnData data={dataset.data1} />
              <ColumnData data={dataset.data2} />
          </Row>
          <Row>
            <ColumnData data={dataset.data3} />
            <ColumnData data={dataset.data4} />
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
    uv: PropTypes.number,
    pv: PropTypes.number,
    amt: PropTypes.number
  })),
  prefix: PropTypes.string,
  dataset: PropTypes.shape({
    data1: PropTypes.string,
    data2: PropTypes.string,
    data3: PropTypes.string,
    data4: PropTypes.string
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
