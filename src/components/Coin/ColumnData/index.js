import React from 'react'
import {Col} from 'react-bootstrap'

export default function ColumnData({data}) {
    return (
        <Col className="with-border value-space">
          <h1>{data}</h1>
        </Col>
    )
}