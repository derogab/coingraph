import React, { Component } from 'react';

import { Modal, Row, Col } from 'antd';

import packageJson from '../../../package.json';

import 'antd/dist/antd.css';
import './index.scss';

export default class Info extends Component {

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
        <>
          <span className="info-trigger" onClick={this.handleOpenModal}>
            Coingraph
          </span>
          <Modal
            title="Coingraph"
            id="info-modal" 
            className="info-modal"
            visible={this.state.open}
            onOk={this.handleOkModal}
            onCancel={this.handleCancelModal}
            footer={[]}
          >
            
            <h4>General</h4>
            <Row>
              <Col span={14}>Version</Col>
              <Col span={10}>
                {packageJson.version}
              </Col>
            </Row>

            <h4>Credits</h4>
            <Row>
              <Col span={14}>
                <a href="https://github.com/derogab" target="_derogab">
                  Gabriele De Rosa
                </a>
              </Col>
              <Col span={10}>Developer</Col>
            </Row>
            <Row>
              <Col span={14}>
                <a href="https://github.com/dibericky" target="_dibericky">
                  Riccardo Di Benedetto
                </a>
              </Col>
              <Col span={10}>Developer</Col>
            </Row>
            
            <h4>Source</h4>
            <Row>
              <Col span={14}>GitHub</Col>
              <Col span={10}>
                <a href="https://github.com/derogab/coingraph" target="_coingraph">
                  derogab/coingraph
                </a>
              </Col>
            </Row>


          </Modal>
        </>
      );
    }
}