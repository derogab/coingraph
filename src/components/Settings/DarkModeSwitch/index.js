import React, { Component } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { Cookies } from 'react-cookie';

import { Switch } from 'antd';

import 'antd/dist/antd.css';
import './index.scss';

export default class DarkModeSwitch extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
    settingsConfigs: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    // Get cookies and configs
    const { cookies, settingsConfigs } = props;
    // Set stateful data
    this.state = {
      cookies: cookies,
      settingsConfigs: settingsConfigs, 
    };
  }
  
  handleChange = (checked) => {
    // Get theme selected
    const newTheme = checked ? 'dark' : 'light';
    // Get function to update theme
    const { setTheme } = this.state.settingsConfigs;
    // Change theme
    setTheme(newTheme);
    // Update cookie theme config
    this.state.cookies.set('theme', newTheme, { path: '/' });
  }
  
  render () {
    // Render theme switch
    return (
      <Switch onChange={this.handleChange} />
    );
  }
}
