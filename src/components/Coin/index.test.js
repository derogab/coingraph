import React from 'react'
import {shallow} from 'enzyme'

import Coin from './'
import ColumnData from './ColumnData';

describe('Coin', () => {
    const props = {
        dataset: {
            data1: 'foo1',
            data2: 'foo2',
            data3: 'foo3',
            data4: 'foo4'
        },
        datagraph:[
            {"name": "Coingraph", "uv": 0, "pv": 0, "amt": 0}
        ],
        prefix: 'my-prefix'
    }

    it('renders 4 ColumnData with correct data', () => {
        const element = shallow(
            <Coin {...props} />
        )
        const columnsData = element.find(ColumnData)
        expect(columnsData).toHaveLength(4)
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