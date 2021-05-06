import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";
import './index.scss';

import { Modal } from "antd";
import { SettingOutlined } from '@ant-design/icons';
import DarkModeSwitch from './DarkModeSwitch'

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
            
            <div className="row">
              <div className="col-md-6">Dark Mode</div>
              <div className="col-md-6"><DarkModeSwitch /></div>
            </div>
          
          </Modal>
        </div>
      );
    }
}