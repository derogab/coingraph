import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Cookies, CookiesProvider, useCookies } from 'react-cookie';

import { Layout } from 'antd';

import CoinsContainer from './containers/Coins';
import MyFooter from './containers/MyFooter';

import ThemeContext from './contexts/ThemeContext';
import TimeChartContext from './contexts/TimeChartContext';

import './theme.scss';
import './App.scss';


function App({socket}) {
  // Init cookies
  const [ cookiesObj ] = useCookies(['theme']);
  const cookies = new Cookies(cookiesObj);
  // Init theme state
  const [theme, setTheme] = useState(cookies.get('theme') || 'light');
  // Init chart time state
  const [time, setTime] = useState(cookies.get('time') || '1w');

  // Init layout
  const { Content } = Layout;
  // Render app
  return (
    <CookiesProvider>
      <ThemeContext.Provider value={{theme, setTheme}}>
        <TimeChartContext.Provider value={{time, setTime}}>
          <Layout className={`App ${theme}`}>
            <Content className='content'>
              <CoinsContainer socket={socket} time={time} />
            </Content>
            <MyFooter cookies={cookies} />
          </Layout>
        </TimeChartContext.Provider>
      </ThemeContext.Provider>
    </CookiesProvider>
  );
}
App.propTypes = {
  socket: PropTypes.object.isRequired   // socket.io client instance
}
export default App;
