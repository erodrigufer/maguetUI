import axios, { CanceledError } from "axios";

export default axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 120_000, // Timeout of 2min (in ms).
    timeoutErrorMessage: "error: a timeout happened",
    withCredentials: false,
    // headers: {
    //     'api-key': 'key',
    // }
})

export { CanceledError };