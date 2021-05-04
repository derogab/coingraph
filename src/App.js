import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CoinsContainer from './containers/Coins';
import Footer from './containers/Footer';
import './theme.scss';
import './App.scss';

function App({socket}) {

  const [theme, setTheme] = useState('light'); // default = light

  return (
    <>
      <div className={`App ${theme}`}>
        <div className="header"></div>
        <div className="content">
          <CoinsContainer socket={socket} />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}
App.propTypes = {
  socket: PropTypes.object.isRequired   // socket.io client instance
}
export default App;
