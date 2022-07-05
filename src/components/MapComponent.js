import React from 'react';
import '../style/map.css'
import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from "leaflet";
import {Container} from "reactstrap"
import {GET} from "../data/fetch.js"
import * as Api from '../data/api'

const position = [38.9637, 35.2433]
let url = 'http://localhost:3001/devices'
let newUrl = 'api/Gnss/GetPositions?startDateTime=2022-06-01%2000%3A00%3A00&finishDateTime=2022-07-01%2000%3A00%3A00'

function GetIcon(equipmentId){
  return L.icon({
    iconUrl: require("../icons/img/" + equipmentId + ".png"),
    iconSize: 35
  })
}

function MapComponent () {
  const [data, setData] = useState([])
  
  const getData = () => {
    fetch(newUrl, {
      method: "GET",
      headers: {
        "access-control-allow-origin" : "*",
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(json => setData(json))
  }

  useEffect(() => {
    getData()
  }, [])

//   async getData(myurl) {
//     const { data: Items } = await GET(myurl);
//     if (Items) {
//       // Set data to state
//       this.setState({ Items });
//     }
//     else {
//       // error
//     }
// }

  return (
    <>
    <MapContainer
      center={position}
      zoom={7}
      scrollWheelZoom={true}
      style={{ width: '100%', height: '95vh' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {data.map(item => (
        <Marker key={item.id} position={[item.latitude, item.longitude]} icon={GetIcon(item.equipmentId)}>
          <Popup>{item.equipmentId}</Popup>
        </Marker>
      ))}

    </MapContainer>
    
    </>
  )
}

export default MapComponent;
