import React from 'react'
import {shallow} from 'enzyme'

import Coin from './'
import { CashData, PercentageData } from './ColumnData';

describe('Coin', () => {
    const props = {
        dataset: {
            data1: 8123.45,
            data2: 12.2,
            data3: 1.5,
            data4: -3.5
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
        const cashData = element.find(CashData)
        expect(cashData).toHaveLength(1)
        expect(cashData.prop('data')).toEqual(props.dataset.data1)
    })

    it('renders 3 PercentageData with correct data', () => {
        const element = shallow(
            <Coin {...props} />
        )
        const columnsData = element.find(PercentageData)
        expect(columnsData).toHaveLength(3)
        const {data2, data3, data4} = props.dataset
        const expectedData = [data2, data3, data4]
        columnsData.forEach((col, index) => {
            expect(col.prop('data')).toEqual(expectedData[index])
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