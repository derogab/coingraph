import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import get from 'lodash.get';

import Coin from '../../components/Coin';

import 'antd/dist/antd.css';
import './index.scss';

export default class CoinsContainer extends Component {

    static propTypes = {
        socket: PropTypes.shape({
            on: PropTypes.func.isRequired
        }).isRequired,
        
        time: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        

        // Get cookies and configs
        const { time } = props;

        this.state = {
            time: time,
            coinsData: {}
        };

        this.isUnmounting = false
    }

    componentDidMount() {
        const io = this.props.socket;
        
        io.on('historical-data', this.onNewData)
        io.on('realtime-data', this.onNewData)
    }

    componentWillUnmount(){
        this.isUnmounting = true
    }

    onNewData = (value) => {
        const { time, coinsData } = this.state

        // Calculate seconds to use
        let seconds = 7 * 24 * 60 * 60; // default = 1w
        if (time === "1h") seconds = 60 * 60; // 1 hour
        if (time === "1d") seconds = 24 * 60 * 60; // 1 day
        if (time === "1w") seconds = 7 * 24 * 60 * 60; // 1 week
        if (time === "1h") seconds = 30 * 24 * 60 * 60; // about 1 month
        const milliseconds = seconds * 1000;

        const now = new Date();
        const time_to_start = new Date(now.getTime() - milliseconds);
        
        const newData = {
            graph: (get(coinsData, [value.id, 'graph'], []).concat(value.graph)).filter((element) => {
                // only one week data show
                var ttd = new Date(element.time); // time of this data
                if(ttd >= time_to_start && ttd <= now) {
                    return true;
                }
                
                return false;
            }),
            data: {
                'data1': value.price_usd,
                'data2': value.percent_change_1h,
                'data3': value.percent_change_24h,
                'data4': value.percent_change_7d,
            }
        }
        if(this.isUnmounting) {
            return
        }
        this.setState({
            coinsData: {
                ...coinsData,
                [value.id] : newData
            }
        })   
    }

    render() {
        const {coinsData} = this.state
        const dataKeys = Object.keys(coinsData)

        if (dataKeys.length === 0) {

            const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

            return (
                <div className="loading">
                    <Spin indicator={antIcon} />
                </div>
            )
        }

        return (
            dataKeys.map(key => {
                const {data, graph} = coinsData[key]
                return (
                    <Coin
                        key={`coin-${key}`}
                        prefix={key}
                        datagraph={graph}
                        dataset={data}
                    />
                )
            })
        )    
    }
}