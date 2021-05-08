import React, { Component } from 'react';

import { Switch } from 'antd';
import ThemeContext, {THEME} from '../../../ThemeContext';

import 'antd/dist/antd.css';
import './index.scss';

export default class DarkModeSwitch extends Component {

    static contextType = ThemeContext
  
    handleChange = (checked) => {
      this.context.setTheme(checked ? THEME.DARK : THEME.LIGHT)
    }
    
    render () {
      return (
        <Switch onChange={this.handleChange} />
      );
    }
}
