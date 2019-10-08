import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


function Ethereum(props) {

  return (
    <div className="Ethereum">
      <header className="Ethereum-header">
      </header>
      <div className="Ethereum-body">

      <Row>
        <Col className="with-border set-height">
          <ResponsiveContainer>
            <LineChart margin={{ top: 5, right: 0, left: 0, bottom: 5 }} data={props.datagraph}>
              <Line type='monotone' dataKey='pv' stroke='#8884d8' strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Col>
        <Col>
          <Row>
            <Col className="with-border value-space">
              <h1>{props.dataset.data1}</h1>
            </Col>
            <Col className="with-border value-space">
              <h1>{props.dataset.data2}</h1>
            </Col>
          </Row>
          <Row>
            <Col className="with-border value-space">
              <h1>{props.dataset.data3}</h1>
            </Col>
            <Col className="with-border value-space">
              <h1>{props.dataset.data4}</h1>
            </Col>
          </Row>
        </Col>
      </Row>       
        

      </div>
    </div>

    
  );
}

export default Ethereum;
