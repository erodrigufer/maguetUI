import axios, { CanceledError } from "axios";

export default axios.create({
    baseURL: 'http://192.168.178.26:8000',
    timeout: 120_000, // Timeout of 2min (in ms).
    timeoutErrorMessage: "error: a timeout happened",
    withCredentials: false,
    // headers: {
    //     'api-key': 'key',
    // }
})

export { CanceledError };
