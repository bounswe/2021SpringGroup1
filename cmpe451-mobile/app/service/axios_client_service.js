import axios from 'axios';

const baseURL = 'http://3.249.82.166:8000/api/v1/protopost/';
export const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
});