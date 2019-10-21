import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const socket = {
    on: jest.fn()
  }
  const div = document.createElement('div');
  ReactDOM.render(<App socket={socket} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
