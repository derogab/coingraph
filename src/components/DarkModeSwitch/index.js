import React, { Component } from 'react';

import "antd/dist/antd.css";
import './index.scss';

import { Switch } from "antd";

export default class DarkModeSwitch extends Component {

    constructor () {
      super();

      this.state = {
        dark: false
      };

      this.handleDark = this.handleDark.bind(this);
      this.handleLight = this.handleLight.bind(this);
    }
    
    handleDark () {
      this.setState({ dark: true });

      console.log('Theme DARK set!');
      
    }
    
    handleLight () {
      this.setState({ dark: false });

      console.log('Theme LIGHT set!');
      
    }

    handleChange(checked) {
      if(checked) this.handleDark();
      else this.handleLight();
    }
    
    render () {
      return (
        <Switch onChange={this.handleChange} />
      );
    }
}
