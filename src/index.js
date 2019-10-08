import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Bitcoin from './Bitcoin';
import Ethereum from './Ethereum';
import * as serviceWorker from './serviceWorker';
var btc_data = {
  'data1': 'data1',
  'data2': 'data2',
  'data3': 'data3',
  'data4': 'data4'
}
var btc_graph = [
  {"name": "Coingraph", "uv": 0, "pv": 0, "amt": 0},
  {"name": "Coingraph", "uv": 100, "pv": 100, "amt": 100},
  {"name": "Coingraph", "uv": 80, "pv": 80, "amt": 80}
];

var eth_data = {
  'data1': 'data1',
  'data2': 'data2',
  'data3': 'data3',
  'data4': 'data4'
}
var eth_graph = [
  {"name": "Coingraph", "uv": 0, "pv": 0, "amt": 0},
  {"name": "Coingraph", "uv": 100, "pv": 100, "amt": 100},
  {"name": "Coingraph", "uv": 50, "pv": 50, "amt": 50}
];


ReactDOM.render(<Bitcoin datagraph={btc_graph} dataset={btc_data}/>, document.getElementById('btc'));
ReactDOM.render(<Ethereum datagraph={eth_graph} dataset={eth_data}/>, document.getElementById('eth'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
