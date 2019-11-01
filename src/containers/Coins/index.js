import React, {Component} from 'react'
import get from 'lodash.get'
import PropTypes from 'prop-types'
import Spinner from 'react-bootstrap/Spinner'

import Coin from '../../components/Coin'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

export default class CoinsContainer extends Component {

    static propTypes = {
        socket: PropTypes.shape({
            on: PropTypes.func.isRequired
        }).isRequired
    }
    constructor(props) {
        super(props)
        this.state = {
            coinsData: {}
        }
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
        console.log('Received', value)
        const {coinsData} = this.state
        const newData = {
            graph: get(coinsData, [value.id, 'graph'], []).concat(value.graph),
            data: {
                'data1': '$'+(value.price_usd.toFixed(2)),
                'data2': ''+(value.percent_change_1h.toFixed(2))+'%',
                'data4': ''+(value.percent_change_7d.toFixed(2))+'%',
                'data3': ''+(value.percent_change_24h.toFixed(2))+'%',
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

        if (dataKeys.length === 0) 
            return (
                <Spinner animation="border" role="status" className="loading">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )

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