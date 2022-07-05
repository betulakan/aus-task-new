import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap";
import DeviceList from './DeviceList';

let url = 'http://localhost:3001/devices'

export default function Equipment() {
    const [data, setData] = useState([])

    const getData = () => {
        fetch(url)
            .then(res => res.json())
            .then(json => setData(json))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Container>
            <Row>
                <Col xs="3">
                    <DeviceList />
                </Col>

                <Col xs="9">
                    <DeviceList />
                </Col>
            </Row>
        </Container>

    )
}
