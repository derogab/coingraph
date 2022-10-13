import React, {Component} from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { Cookies } from 'react-cookie';

import { Layout, Row, Col } from 'antd';

import Settings from '../../components/Settings';
import Info from '../../components/Info';

import 'antd/dist/antd.css';
import './index.scss';


export default class MyFooter extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor (props) {
        super(props);
        // Get cookies and configs
        const { cookies } = props;
        // Set stateful data
        this.state = {
            cookies: cookies,
        };
    }

    render() {
        // Get footer component
        const { Footer } = Layout;
        // Render footer
        return (
            <Footer className="footer">
                <Row className="footer-content">
                    <Col span={12}>
                        <Info/> • Made with ❤️ by <a target="_derogab" href="https://github.com/derogab">@derogab</a> • Open Source on <a target="_coingraph" href="https://github.com/derogab/coingraph">GitHub</a>
                    </Col>
                    <Col span={12}>
                        <div className="settings-right">
                            <Settings cookies={this.state.cookies} />
                        </div>
                    </Col>
                </Row>
            </Footer>
        )   
    }
}
