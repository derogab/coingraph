import React, { Component } from 'react';

import { Modal, Row, Col } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import DarkModeSwitch from './DarkModeSwitch'

import 'antd/dist/antd.css';
import './index.scss';

export default class Settings extends Component {

    constructor () {
      super();

      this.state = {
        open: false
      };

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
            visible={this.state.open}
            onOk={this.handleOkModal}
            onCancel={this.handleCancelModal}
          >
            
            <Row>
              <Col span={14}>Dark Mode</Col>
              <Col span={10}>
                <DarkModeSwitch />
              </Col>
            </Row>
          
          </Modal>
        </div>
      );
    }
}