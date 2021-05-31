import React, {Component} from 'react';
import { Layout, Row, Col } from 'antd';

import Settings from '../../components/Settings';
import Info from '../../components/Info';

import 'antd/dist/antd.css';
import './index.scss';


export default class MyFooter extends Component {

    render() {

        const { Footer } = Layout;

        return (
            <Footer className="footer">
                <Row className="footer-content">
                    <Col span={12}>
                        <Info/> • Made with ❤️ by <a target="_derogab" href="https://github.com/derogab">@derogab</a> • Open Source on <a target="_coingraph" href="https://github.com/derogab/coingraph">GitHub</a>
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