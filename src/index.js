import React from 'react';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';

import App from './App';
import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css';
import './index.scss';

const SOCKET_URL = process.env.REACT_APP_DAEMON_SOCKET_URL || 'http://localhost';
const SOCKET_PORT = process.env.REACT_APP_DAEMON_SOCKET_PORT || 8081;
const socketIo = io(`${SOCKET_URL}:${SOCKET_PORT}`);

ReactDOM.render(<App socket={socketIo} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
