import React, { Component } from 'react'
import { TableContainer, TableCaption, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import {Table} from "reactstrap"

let url = 'http://localhost:3001/devices'

export default class DeviceList extends Component {
    state = {
        devices: []
    };

    componentDidMount() {
        this.getDevices();
    }

    getDevices = () => {
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ devices: data }))
    }


    render() {
        return (
            <div>
                <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                <th>Device List</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.devices.map(item => (
                                <tr key={item.id}>
                                    <td onClick={() => console.log(item.id)}>
                                        {item.deviceName} - {item.deviceIP}

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}
