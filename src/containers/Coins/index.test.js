import React from 'react'
import moxios from 'moxios'
import {shallow} from 'enzyme'

import CoinContainer from './'
import Bitcoin from '../../components/Bitcoin';
import Ethereum from '../../components/Ethereum';

const btc_data = {
    'data1': 'btc_data1',
    'data2': 'btc_data2',
    'data3': 'btc_data3',
    'data4': 'btc_data4'
}
const btc_graph = [
    {"name": "btc_Coingraph", "uv": 0, "pv": 0, "amt": 0},
    {"name": "btc_Coingraph", "uv": 100, "pv": 100, "amt": 100},
    {"name": "btc_Coingraph", "uv": 80, "pv": 80, "amt": 80}
  ];
  
const eth_data = {
    'data1': 'eth_data1',
    'data2': 'eth_data2',
    'data3': 'eth_data3',
    'data4': 'eth_data4'
}
const eth_graph = [
    {"name": "eth_Coingraph", "uv": 0, "pv": 0, "amt": 0},
    {"name": "eth_Coingraph", "uv": 100, "pv": 100, "amt": 100},
    {"name": "eth_Coingraph", "uv": 50, "pv": 50, "amt": 50}
  ];
describe('CoinContainer', () => {
    beforeEach(() => {
        moxios.install()
    })
    afterEach(() => {
        moxios.uninstall()
    })
    it('passes correct data to Ethereum and Bitcoin', (done) => {
        const element = shallow(<CoinContainer />)
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            const response = {
                btc_data,
                btc_graph,
                eth_data,
                eth_graph
            }
            expect(request.url).toEqual('/coins-data/')
            request.respondWith({
                status: 200,
                response
            }).then(() => {
                const bitcoinElement = element.find(Bitcoin)
                expect(bitcoinElement).toHaveLength(1)
                expect(bitcoinElement.prop('datagraph')).toEqual(btc_graph)
                expect(bitcoinElement.prop('dataset')).toEqual(btc_data)

                const ethereumElement = element.find(Ethereum)
                expect(ethereumElement).toHaveLength(1)
                expect(ethereumElement.prop('datagraph')).toEqual(eth_graph)
                expect(ethereumElement.prop('dataset')).toEqual(eth_data)

                done()
            })
        })
    })
    it('renders Error if fetch fails', (done) => {
        const element = shallow(<CoinContainer />)
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 401
            }).then(() => {
                expect(element.state().isFetchError).toBe(true)
                expect(element.text()).toEqual('Error fetching data...')
                done()
            })
        })
    })
    it('renders loading if fetch has not yet been completed', (done) => {
        const element = shallow(<CoinContainer />)
        moxios.wait(() => {
            expect(element.state().data).toBeNull()
            expect(element.text()).toEqual('Loading...')
            done()
        })
    })
})