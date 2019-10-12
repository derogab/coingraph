import React, {Component, Fragment} from 'react'
import axios from 'axios'

import Ethereum from '../../components/Ethereum'
import Bitcoin from '../../components/Bitcoin'

export default class CoinsContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isFetchError: false
        }
        this.isUnmounting = false
    }

    componentDidMount() {
        axios.get('/coins-data/')
            .then(response => {
                if(this.isUnmounting) {
                    return
                }
                const {data} = response
                this.setState({
                    data,
                    isFetchError: false
                })
            })
            .catch(error =>{
                if(this.isUnmounting) {
                    return
                }
                this.setState({
                    data: null,
                    isFetchError: true
                }, () => console.log(error.message))
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