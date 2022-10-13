import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { Cookies } from 'react-cookie';

import { Select } from 'antd';

import TimeChartContext, { TIME } from '../../../contexts/TimeChartContext';

import 'antd/dist/antd.css';
import './index.scss';

export default class ChartTime extends Component {

    static contextType = TimeChartContext;

    static propTypes = {
      cookies: instanceOf(Cookies).isRequired,
    };

    handleChange = (value) => {
      // Log selected value
      console.log(`selected ${value}`);
      // Change time chart
      this.context.setTime(value);
      // Update cookie time chart config
      this.props.cookies.set('time', value, { path: '/' });
    };
    
    render () {
      // Init options
      const { Option } = Select;
      // Generate selector
      return (
        <>
          <Select defaultValue={TIME.WEEK} onChange={this.handleChange}>
            <Option value={TIME.HOUR} disabled>Last hour</Option>
            <Option value={TIME.DAY}>Last day</Option>
            <Option value={TIME.WEEK}>Last week</Option>
            <Option value={TIME.MONTH}>Last month</Option>
          </Select>
        </>
      );
    }
}
