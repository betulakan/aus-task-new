// import axios from 'axios';
// import { json } from 'express';

// const myurl = 'http://localhost:3001/devices'
// const newUrl = 'api/Gnss/GetPositions?startDateTime=2022-06-01%2000%3A00%3A00&finishDateTime=2022-07-01%2000%3A00%3A00'

// export const onAuthenticate = payload => {
//     return axios(myurl, {
//         method:'POST',
//         responseType: 'json',
//         headers: {
//             "access-control-allow-origin" : "*",
//             "Content-type": "application/json; charset=UTF-8"
//           },
//           data: payload,
//     })
//         .then(response => response.data)
//         .catch(error => {
//             throw error;
//         });
// }