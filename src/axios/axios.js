import axios from 'axios'

const URL = 'https://v2.api-football.com/'

// const cancelToken = axios.CancelToken
let cancelToken;
// teams/team/541
// export const api = (end, callback) => {

//     //Check if there are any previous pending requests
//     if (cancelToken !== undefined)
//         cancelToken.cancel("Operation canceled due to new request.");

//     //Save the cancel token for the current request
//     cancelToken = axios.CancelToken.source();
//     var config = {
//         headers: { 'X-RapidAPI-Key': '980182d5a3626fcf8e91ef098d79aa35' },
//         cancelToken: cancelToken.token //Pass the cancel token to the current request
//     };
//     axios.get(`${URL}${end}`, config)
//         .then(res => callback(res.data.api))
//         .catch(err => console.log(err))
// }

export const api = (endpoint, callback) => {
    var config = {
        headers: { 'X-RapidAPI-Key': '980182d5a3626fcf8e91ef098d79aa35' },
    };

    axios.get(`${URL}${endpoint}`, config)
        .then(res => callback(res.data.api))
        .catch(err => console.log(err))
}

// export const api_multiple = (end1, end2, callback1, callback2) => {
//     console.log(end1, end2);
//     var config = {
//         headers: { 'X-RapidAPI-Key': '980182d5a3626fcf8e91ef098d79aa35' },
//     };
//     const endpoint_1 = `${URL}${end1}`
//     const endpoint_2 = `${URL}${end2}`

//     const getData_1 = axios.get(endpoint_1, config)
//     const getData_2 = axios.get(endpoint_2, config)

//     axios.all([getData_1, getData_2]).then(
//         axios.spread((...allData) => {
//             callback1(allData[0].data.api);
//             console.log(allData[0].data);
//             callback2(allData[1].data.api);
//         })
//     ).catch(error => console.log(error))
// }