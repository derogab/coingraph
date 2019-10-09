import React from 'react';

import './index.css';
import Coin from '../Coin'

function Bitcoin(props) {
  return (
    <Coin 
      {...props}
      prefix={'Bitcoin'}
    />)
}

export default Bitcoin;
