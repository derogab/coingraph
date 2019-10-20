import React, {Component, Fragment} from 'react'

import Ethereum from '../../components/Ethereum'
import Bitcoin from '../../components/Bitcoin'

export default class CoinsContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {
                'btc_data': {},
                'btc_graph': [],
                'eth_data': {},
                'eth_graph': []
            },
            isFetchError: false
        }
        this.isUnmounting = false
    }

    componentDidMount() {

        var io = this.props.socket;
        var {data, isFetchError} = this.state

        io.on('historical-data', (d) => {

            if(d.id === 'bitcoin'){
                data.btc_graph = d.graph
                data.btc_data = {
                    'data1': ''+d.price_usd,
                    'data2': ''+d.percent_change_1h,
                    'data3': ''+d.percent_change_24h,
                    'data4': ''+d.percent_change_7d
                }
            }
            else if(d.id === 'ethereum'){
                data.eth_graph = d.graph
                data.eth_data = {
                    'data1': ''+d.price_usd,
                    'data2': ''+d.percent_change_1h,
                    'data3': ''+d.percent_change_24h,
                    'data4': ''+d.percent_change_7d
                }
            }
    
            if(this.isUnmounting) {
                return
            }

            this.setState({
                data,
                isFetchError: false
            })

        })

        io.on('realtime-data', (d) => {

            if(d.id === 'bitcoin'){
                data.btc_graph.push(d.graph);
                data.btc_data = {
                    'data1': ''+d.price_usd,
                    'data2': ''+d.percent_change_1h,
                    'data3': ''+d.percent_change_24h,
                    'data4': ''+d.percent_change_7d
                }
            }
            else if(d.id === 'ethereum'){
                data.eth_graph.push(d.graph);
                data.eth_data = {
                    'data1': ''+d.price_usd,
                    'data2': ''+d.percent_change_1h,
                    'data3': ''+d.percent_change_24h,
                    'data4': ''+d.percent_change_7d
                }
            }

            if(this.isUnmounting) {
                return
            }

            this.setState({
                data,
                isFetchError: false
            })           

        })

    }
    componentWillUnmount(){
        this.isUnmounting = true
    }
    render() {
        const {data, isFetchError} = this.state

        if(isFetchError) return 'Error fetching data...'
        if(!data) return 'Loading...'

        const {btc_graph, btc_data, eth_graph, eth_data} = data
        return (
            <Fragment>
                <Bitcoin datagraph={btc_graph} dataset={btc_data}/>
                <Ethereum datagraph={eth_graph} dataset={eth_data}/>
            </Fragment>
        )
    }
}