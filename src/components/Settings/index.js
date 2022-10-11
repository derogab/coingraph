import React, { Component } from 'react';
import { Cookies } from 'react-cookie';
import PropTypes, { instanceOf } from 'prop-types';

import { Modal, Button, Row, Col } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import DarkModeSwitch from './DarkModeSwitch';

import 'antd/dist/antd.css';
import './index.scss';

export default class Settings extends Component {

    static propTypes = {
      cookies: instanceOf(Cookies).isRequired,
      settingsConfigs: PropTypes.object.isRequired,
    };

    constructor (props) {
      super(props);
      // Get cookies and configs
      const { cookies, settingsConfigs } = props;
      // Set stateful data
      this.state = {
        open: false,
        cookies: cookies,
        settingsConfigs: settingsConfigs,
      };
      // Bind everything
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleOkModal = this.handleOkModal.bind(this);
      this.handleCancelModal = this.handleCancelModal.bind(this);
    }
    
    handleOpenModal () {
      this.setState({ open: true });
    }
    
    handleOkModal () {
      this.setState({ open: false });
    }

    handleCancelModal () {
      this.setState({ open: false });
    }
    
    render () {
      return (
        <div>
          <SettingOutlined 
            className="settings-trigger text-muted"
            onClick={this.handleOpenModal}
          />
          <Modal
            title="Settings"
            id="settings-modal" 
            open={this.state.open}
            onOk={this.handleOkModal}
            onCancel={this.handleCancelModal}
            footer={[
              <Button key="submit" type="primary" onClick={this.handleOkModal}>
                Ok
              </Button>
            ]}
          >
            
            <Row>
              <Col span={14}>Dark Mode</Col>
              <Col span={10}>
                <DarkModeSwitch cookies={this.state.cookies} settingsConfigs={this.state.settingsConfigs} />
              </Col>
            </Row>
            
          </Modal>
        </div>
      );
    }
}
