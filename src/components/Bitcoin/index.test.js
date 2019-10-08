import React from 'react';
import ReactDOM from 'react-dom';
import Bitcoin from './Bitcoin';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Bitcoin />, div);
  ReactDOM.unmountComponentAtNode(div);
});
