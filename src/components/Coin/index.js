import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function ColumnData({data}) {
    return (
        <Col className="with-border value-space">
          <h1>{data}</h1>
        </Col>
    )
}
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
            <ColumnData data={dataset.data2} />
            <ColumnData data={dataset.data4} />
          </Row>
        </Col>
      </Row>       
      </div>
    </div>

    
  );
}

export default Coin;
