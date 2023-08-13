import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Cookies, CookiesProvider, useCookies } from 'react-cookie';

import { Layout } from 'antd';

import CoinsContainer from './containers/Coins';
import MyFooter from './containers/MyFooter';

import './theme.scss';
import './App.scss';


function App({socket}) {
  // Init cookies
  const [ cookiesObj ] = useCookies(['theme']);
  const cookies = new Cookies(cookiesObj);
  // Init theme state
  const [theme, setTheme] = useState(cookies.get('theme') || 'light');
  
  // Set settings configurations
  const settingsConfigs = {
    setTheme, // change theme
  };

  // Init layout
  const { Content } = Layout;
  // Render app
  return (
    <CookiesProvider>
      <Layout className={`App ${theme}`}>
        <Content className='content'>
          <CoinsContainer socket={socket} />
        </Content>
        <MyFooter cookies={cookies} settingsConfigs={settingsConfigs}/>
      </Layout>
    </CookiesProvider>
  );
}
App.propTypes = {
  socket: PropTypes.object.isRequired   // socket.io client instance
}
export default App;
