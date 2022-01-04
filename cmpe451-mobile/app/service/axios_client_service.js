import axios from 'axios';

const baseURL = 'http://3.249.82.166:8000/api/v1/protopost/';
export let user_name = "";
export let user_id = 1;
export const set_user_name = (usr) => {
  user_name = usr
}
export const set_user_id = (usrid) => {
    user_id = usrid
}
export const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
});