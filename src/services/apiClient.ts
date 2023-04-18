import axios, { CanceledError } from "axios";

export default axios.create({
    baseURL: 'endpoint.com',
    // headers: {
    //     'api-key': 'key',
    // }
})

export { CanceledError };