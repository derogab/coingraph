import React from 'react';
import PropTypes from 'prop-types'

import CoinsContainer from './containers/Coins'
import './App.css'

function App({socket}) {
  return (
    <CoinsContainer socket={socket} />
  );
}
App.propTypes = {
  socket: PropTypes.object.isRequired   // socket.io client instance
}
export default App;
