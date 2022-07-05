import axios from 'axios';
const myurl = 'http://localhost:3001/devices'
const newUrl = 'api/Gnss/GetPositions?startDateTime=2022-06-01%2000%3A00%3A00&finishDateTime=2022-07-01%2000%3A00%3A00'

export const GET = url => {
    return axios('${myurl}/${url}',{
        method: 'GET',
        headers: {
            "access-control-allow-origin" : "*",
            "Content-type": "application/json; charset=UTF-8"
          }
    });
}