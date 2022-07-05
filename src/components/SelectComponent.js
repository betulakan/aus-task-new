import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import "./Navbar/Navbar.css"
 
let url = 'http://localhost:3001/devices'
let newUrl = 'api/Gnss/GetPositions?startDateTime=2022-06-01%2000%3A00%3A00&finishDateTime=2022-07-01%2000%3A00%3A00'

export default function SelectComponent(props) {

  const [data, setData] = useState([])
  
  const getData = () => {
    fetch(url, {
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

  const options = data.map(item => ({
    "value": item.equipmentId,
    "label": item.equipmentId
  }))

  return (
    <div>
      <Select className='select' options={options}/>
    </div>
  )
}
