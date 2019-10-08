import React from 'react';

import Coin from '../Coin'
import './index.css';



function Ethereum(props) {
  return (
    <Coin 
      {...props}
      prefix={'Ethereum'}
    />)
}

export default Ethereum;
