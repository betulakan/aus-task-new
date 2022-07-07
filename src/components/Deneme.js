import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
    Select,
    Box,
    VStack,
    HStack,
    Flex,
    Wrap,
    Text,
    Button,
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
const titleStyle = {
    fontWeight: "bold",
    mx: "1",
    mb: "2",
    mt: "2",
    color: "white",
};

export default function Deneme() {
    const position = [38.9637, 35.2433]
    let url = 'http://localhost:3001/devices'
    let newUrl = 'api/Gnss/GetPositions?startDateTime=2022-06-01%2000%3A00%3A00&finishDateTime=2022-07-01%2000%3A00%3A00'

    const [data, setData] = useState([]);
    const [selectValue, setSelectValue] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    function GetIcon(equipmentId) {
        return L.icon({
            iconUrl: require("../icons/img/" + equipmentId + ".png"),
            iconSize: 35
        })
    }

    const getData = () => {
        fetch(url, {
            method: "GET",
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(json => setData(json))
    };

    useEffect(() => {
        getData()
    }, []);

    // const selectedEq = (e) => {
    //     const selectedEquipment = e.target.value;
    //     setSelectValue(selectedEquipment)
    // }


    // const optionss = [
    //     data.map(item => {
    //         if (options.indexOf(item.equipmentId) === -1) {
    //             options.push(item.equipmentId)
    //             console.log(options)
    //         }
    //     })
    // ];

    const secenekler = data.map((item) => ({
        value: item.equipmentId,
        label: item.equipmentId
    }))

    function getRequestedDevice() {
        data.map(item => {
            console.log("####");
            if ((item.equipmentId === selectValue) &&
                ((JSON.parse(JSON.stringify(startDate)) <= item.postingDate)
                    && (item.postingDate <= JSON.parse(JSON.stringify(endDate)))))
                return (
                    <Marker key={item.id} position={[item.latitude, item.longitude]} icon={GetIcon(item.equipmentId)}>
                        <Popup>{item.equipmentId}</Popup>
                        {console.log(item.latitude)}
                    </Marker>
                );
        })
    }

    const mapRef = useRef(null)
    const markerRef = useRef(null)
    

    const denemeYapiyorum = () => {
        const map = mapRef.current
        if (!map) {
            return;
        }

        const marker = markerRef.current
        if (marker) {
            marker.openPopup();
        }
    }

    return (
        <Flex direction="column" bg={"#242b2c"}>
            <Wrap align="stretch"
                justify="stretch"
                alignContent="stretch"
                spacing={0}
                w="full">
                <HStack borderRadius="sm"
                    h={""}
                    p={"2"}
                    alignItems="center"
                    justify="center">

                    <VStack spacing={0}>
                        <Text {...titleStyle}>Equipment ID</Text>
                        <Select
                            value={selectValue}
                            onChange={(e) => setSelectValue(e.currentTarget.value)}
                            width="130px"
                            bg="white"
                            placeholder='Select a device'
                        >
                            {data.map(item => (
                                <option key={item.id}>{item.equipmentId}</option>
                            ))}
                        </Select>

                    </VStack>

                    <VStack spacing={0}>
                        <Text {...titleStyle}>Start Date</Text>
                        <DatePicker
                            portalId="root"
                            bg="white"
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            showTimeSelect
                            timeIntervals={5}
                            timeFormat="HH:mm"
                            dateFormat="MM/dd/yyyy HH:mm"
                            isClearable
                            showYearDropdown
                            maxDate={new Date()}
                        />
                    </VStack>

                    <VStack spacing={0}>
                        <Text {...titleStyle}>End Date</Text>
                        <DatePicker
                            portalId="root"
                            bg="white"
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            showTimeSelect
                            timeIntervals={5}
                            timeFormat="HH:mm"
                            dateFormat="MM/dd/yyyy HH:mm"
                            isClearable
                            showYearDropdown
                            minDate={startDate}
                        />
                    </VStack>

                    <VStack spacing={0}>
                        <Button
                            colorScheme='yellow'
                            variant='solid'
                            onClick={denemeYapiyorum}>Get</Button>
                    </VStack>
                </HStack>

            </Wrap>
            <Box zIndex={1}>
                <MapContainer
                    whenCreated={(map) => {
                        mapRef.current = map;
                    }}

                    center={position}
                    zoom={7}
                    scrollWheelZoom={true}
                    style={{ width: '100%', height: '95vh' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

                    />

                    <Marker ref={markerRef}  position={position} >
                        <Popup>hello</Popup>
                    </Marker>

                    {/* {data.map(item => {
                        if ((item.equipmentId === selectValue) &&
                            ((JSON.parse(JSON.stringify(startDate)) <= item.postingDate)
                                && (item.postingDate <= JSON.parse(JSON.stringify(endDate)))))
                            return (
                                <Marker ref={markerRef} key={item.id} position={[item.latitude, item.longitude]} icon={GetIcon(item.equipmentId)}>
                                    <Popup>{item.equipmentId}</Popup>
                                </Marker>
                            );
                    })} */}

                </MapContainer>
            </Box>

        </Flex>
    )

}
