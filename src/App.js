import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ThemeContext from './ThemeContext';
import CoinsContainer from './containers/Coins';
import MyFooter from './containers/MyFooter';
import './theme.scss';
import './App.scss';

import { Layout } from 'antd';
const { Content } = Layout;

function App({socket}) {

  const [theme, setTheme] = useState('light'); // default = light

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <Layout className={`App ${theme}`}>
        <Content className='content'>
          <CoinsContainer socket={socket} />
        </Content>
        <MyFooter />
      </Layout>
    </ThemeContext.Provider>
  );
}
App.propTypes = {
  socket: PropTypes.object.isRequired   // socket.io client instance
}
export default App;
