import React from 'react'
import { shallow } from 'enzyme'
import { Spin } from 'antd';

import CoinContainer from './'
import Coin from '../../components/Coin';

const btc_data = {
    'data1': 8123.45,
    'data2': 12.2,
    'data3': 1.11,
    'data4': -3.45
}
const btc_graph = [
    {"name": "btc_Coingraph", "price": 0, "time": 1},
    {"name": "btc_Coingraph", "price": 100, "time": 100},
    {"name": "btc_Coingraph", "price": 80, "time": 80}
  ];
  
const eth_data = {
    'data1': 8123.45,
    'data2': 12.2,
    'data3': 1.11,
    'data4': -3.45
}
const eth_graph = [
    {"name": "eth_Coingraph", "price": 0, "time": 1},
    {"name": "eth_Coingraph", "price": 100, "time": 100},
    {"name": "eth_Coingraph", "price": 50, "time": 50}
  ];
describe('CoinContainer', () => {
    const props = {
        socket: {
            on: jest.fn()
        }
    }
    beforeEach(() => {
        props.socket.on.mockClear()
    })
    it('renders correct coins on `historical-data` and `realtime-data`', () => {
        const NOW = 1000*1000
        jest.spyOn(global.Date, 'now').mockImplementation(() => NOW)
        const callbacks = {}
        props.socket.on.mockImplementation((key, fn) => {
            callbacks[key] = fn
        })
        const element = shallow(<CoinContainer {...props} />)
        expect(Object.keys(callbacks)).toEqual(['historical-data', 'realtime-data'])
        callbacks['historical-data']({
            id: 'bitcoin',
            price_usd: btc_data.data1,
            percent_change_1h: btc_data.data2,
            percent_change_24h: btc_data.data3,
            percent_change_7d: btc_data.data4,
            graph: btc_graph
        })
        callbacks['realtime-data']({
            id: 'ethereum',
            price_usd: eth_data.data1,
            percent_change_1h: eth_data.data2,
            percent_change_24h: eth_data.data3,
            percent_change_7d: eth_data.data4,
            graph: eth_graph
        })

        const coinsFound = element.find(Coin)
        const bitcoinElement = coinsFound.at(0)
        expect(bitcoinElement).toHaveLength(1)
        expect(bitcoinElement.prop('datagraph')).toEqual(btc_graph)
        expect(bitcoinElement.prop('dataset')).toEqual(btc_data)

        const ethereumElement = coinsFound.at(1)
        expect(ethereumElement).toHaveLength(1)
        expect(ethereumElement.prop('datagraph')).toEqual(eth_graph)
        expect(ethereumElement.prop('dataset')).toEqual(eth_data)
    })
    it('concat graph when receives new data with same id', (done) => {
        const NOW = 1000*1000
        jest.spyOn(global.Date, 'now').mockImplementation(() => NOW)
        const callbacks = {}
        props.socket.on.mockImplementation((key, fn) => {
            callbacks[key] = fn
        })
        const element = shallow(<CoinContainer {...props} />)
        expect(Object.keys(callbacks)).toEqual(['historical-data', 'realtime-data'])
        callbacks['historical-data']({
            id: 'bitcoin',
            price_usd: btc_data.data1,
            percent_change_1h: btc_data.data2,
            percent_change_24h: btc_data.data3,
            percent_change_7d: btc_data.data4,
            graph: btc_graph
        })
        const new_btc_data = {
            'data1': 8123.45,
            'data2': 12.2,
            'data3': 1.11,
            'data4': -3.54
        }
        const new_btc_graph = [
            {"name": "btc_Coingraph1", "price": 1, "time": 1},
            {"name": "btc_Coingraph1", "price": 81, "time": 81},
            {"name": "btc_Coingraph1", "price": 101, "time": 101}
          ];
        const coinsFound = element.find(Coin)
        expect(coinsFound).toHaveLength(1)
        const beforeBitcoinElement = coinsFound.at(0)
        expect(beforeBitcoinElement).toHaveLength(1)
        expect(beforeBitcoinElement.prop('datagraph')).toEqual(btc_graph)
        expect(beforeBitcoinElement.prop('dataset')).toEqual(btc_data)
        callbacks['realtime-data']({
            id: 'bitcoin',
            price_usd: new_btc_data.data1,
            percent_change_1h: new_btc_data.data2,
            percent_change_24h: new_btc_data.data3,
            percent_change_7d: new_btc_data.data4,
            graph: new_btc_graph
        })
        const afterCoinsFound = element.find(Coin)
        expect(afterCoinsFound).toHaveLength(1)
        const afterBitcoinElement = afterCoinsFound.at(0)
        expect(afterBitcoinElement).toHaveLength(1)
        expect(afterBitcoinElement.prop('datagraph')).toEqual(btc_graph.concat(new_btc_graph))
        expect(afterBitcoinElement.prop('dataset')).toEqual(new_btc_data)
        done()
    })
    it('renders loading if no data has been received', () => {
        const element = shallow(<CoinContainer {...props} />)
        expect(element.state().coinsData).toEqual({})
        expect(element.find(Spin)).toHaveLength(1)
    })
})