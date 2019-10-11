import React from 'react';
import ReactDOM from 'react-dom';
import Ethereum from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Ethereum />, div);
  ReactDOM.unmountComponentAtNode(div);
});
