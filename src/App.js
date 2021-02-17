import React from 'react';
import PropTypes from 'prop-types'

import CoinsContainer from './containers/Coins'
import Footer from './containers/Footer'
import './App.css'

function App({socket}) {
  return (
    <>
      <div className="header"></div>
      <div className="content">
        <CoinsContainer socket={socket} />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}
App.propTypes = {
  socket: PropTypes.object.isRequired   // socket.io client instance
}
export default App;
