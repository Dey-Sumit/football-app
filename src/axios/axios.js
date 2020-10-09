// import axios from 'axios'

// const URL = 'https://v2.api-football.com/'

// //TODO fix it
// const API_KEY = process.env.API_KEY;
// console.log(API_KEY);

// export const api = async (endpoint, callback) => {
//     console.log("API called");
//     const request = axios.create({
//         method: 'get',
//         baseURL: URL,
//         headers: { 'X-RapidAPI-Key': '980182d5a3626fcf8e91ef098d79aa35' }
//     })

//     try {
//         const res = await request(endpoint)
//         console.log(res.data.api);
//         callback(res.data.api);
//     } catch (error) {
//         console.log(error);
//     }

// }

// let cancelToken;
// export const api_with_cancel_token = async (endpoint, callback) => {

//     //Check if there are any previous pending requests
//     if (cancelToken !== undefined)
//         cancelToken.cancel("Operation canceled due to new request.");

//     //Save the cancel token for the current request
//     cancelToken = axios.CancelToken.source();

//     //create an axios instance  
//     const request = axios.create({
//         method: 'get',
//         baseURL: URL,
//         headers: { 'X-RapidAPI-Key': '980182d5a3626fcf8e91ef098d79aa35' },
//         cancelToken: cancelToken.token //Pass the cancel token to the current request
//     })

//     try {
//         const res = await request(endpoint);
//         console.log(res.data.api);
//         callback(res.data.api);

//     } catch (error) {
//         console.log(error);
//     }

// }




// // export const api_multiple = (end1, end2, callback1, callback2) => {
// //     console.log(end1, end2);
// //     var config = {
// //         headers: { 'X-RapidAPI-Key': '980182d5a3626fcf8e91ef098d79aa35' },
// //     };
// //     const endpoint_1 = `${URL}${end1}`
// //     const endpoint_2 = `${URL}${end2}`

// //     const getData_1 = axios.get(endpoint_1, config)
// //     const getData_2 = axios.get(endpoint_2, config)

// //     axios.all([getData_1, getData_2]).then(
// //         axios.spread((...allData) => {
// //             callback1(allData[0].data.api);
// //             console.log(allData[0].data);
// //             callback2(allData[1].data.api);
// //         })
// //     ).catch(error => console.log(error))
// // }