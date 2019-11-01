import React from 'react'
import {shallow} from 'enzyme'

import Coin from './'
import { CashData, PercentageData } from './ColumnData';

describe('Coin', () => {
    const props = {
        dataset: {
            data1: 'foo1',
            data2: 'foo2',
            data3: 'foo3',
            data4: 'foo4'
        },
        datagraph:[
            {"name": "Coingraph", "price": 0, "time": 0}
        ],
        prefix: 'my-prefix'
    }

    it('renders 1 CashData with correct data', () => {
        const element = shallow(
            <Coin {...props} />
        )
        const columnsData = element.find(CashData)
        expect(columnsData).toHaveLength(1)
        const expectedData = Object.keys(props.dataset)
        columnsData.forEach((col, index) => {
            const key = expectedData[index]
            expect(col.prop('data')).toEqual(props.dataset[key])
        })
    })

    it('renders 3 PercentageData with correct data', () => {
        const element = shallow(
            <Coin {...props} />
        )
        const columnsData = element.find(PercentageData)
        expect(columnsData).toHaveLength(3)
        const expectedData = Object.keys(props.dataset)
        columnsData.forEach((col, index) => {
            const key = expectedData[index]
            expect(col.prop('data')).toEqual(props.dataset[key])
        })
    })

    it('renders components with correct className filled with prefix', () => {
        const element = shallow(<Coin {...props} />)
        const expected = ['header', 'body']
        expected.forEach(name => {
            const found = element.findWhere(node => node.hasClass(`${props.prefix}-${name}`))
            expect(found).toHaveLength(1)
        })

    })
})