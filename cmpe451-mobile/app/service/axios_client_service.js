import axios from 'axios';

const baseURL = 'http://54.217.117.68:8000/api/v1/protopost/';

export const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    timeout: 30000,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
});