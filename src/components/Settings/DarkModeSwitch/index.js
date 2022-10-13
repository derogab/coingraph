import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { Cookies } from 'react-cookie';

import { Switch } from 'antd';

import ThemeContext, { THEME } from '../../../contexts/ThemeContext';

import 'antd/dist/antd.css';
import './index.scss';

export default class DarkModeSwitch extends Component {

  static contextType = ThemeContext;

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  handleChange = (checked) => {
    // Get theme selected
    const newTheme = checked ? THEME.DARK : THEME.LIGHT;
    // Change theme
    this.context.setTheme(newTheme);
    // Update cookie theme config
    this.props.cookies.set('theme', newTheme, { path: '/' });
  }
  
  render () {
    // Render theme switch
    return (
      <Switch onChange={this.handleChange} />
    );
  }
}
