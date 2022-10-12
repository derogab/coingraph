import React, { Component } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { Cookies } from 'react-cookie';

import { Select } from 'antd';

import 'antd/dist/antd.css';
import './index.scss';

export default class ChartTime extends Component {

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
  
    handleChange = (value) => {
      // Log selected value
      console.log(`selected ${value}`);
      // Get function to update time chart
      const { setTime } = this.state.settingsConfigs;
      // Change time chart
      setTime(value);
      // Update cookie time chart config
      this.state.cookies.set('time', value, { path: '/' });
    };
    
    render () {
      // Init options
      const { Option } = Select;
      // Generate selector
      return (
        <>
          <Select defaultValue="1w" onChange={this.handleChange}>
            <Option value="1h" disabled>Last hour</Option>
            <Option value="1d">Last day</Option>
            <Option value="1w">Last week</Option>
            <Option value="1m">Last month</Option>
          </Select>
        </>
      );
    }
}
