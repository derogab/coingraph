import React, {Component} from 'react'

import Settings from '../../components/Settings'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import { Layout, Row, Col } from 'antd';
const { Footer } = Layout;

export default class MyFooter extends Component {

    render() {

        return (
            <Footer className="footer">
                <Row className="footer-content">
                    <Col span={12}>
                        Coingraph • Made with ❤️ by <a target="_derogab" href="https://github.com/derogab">@derogab</a> • Open Source on <a target="_coingraph" href="https://github.com/derogab/coingraph">GitHub</a>
                    </Col>
                    <Col span={12}>
                        <div className="settings-right">
                            <Settings/>
                        </div>
                    </Col>
                </Row>
            </Footer>
        )   
    }
}