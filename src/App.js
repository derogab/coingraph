import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Layout } from 'antd';
import ThemeContext from './ThemeContext';
import CoinsContainer from './containers/Coins';
import MyFooter from './containers/MyFooter';

import './theme.scss';
import './App.scss';


function App({socket}) {

  const [theme, setTheme] = useState('light'); // default = light

  const { Content } = Layout;

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
