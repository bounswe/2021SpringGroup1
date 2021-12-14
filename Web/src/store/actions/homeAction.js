import {urls} from 'DATABASE'
import axios from 'axios';
import {useSelector} from 'react-redux';
import { FORM_DATA_TEXT } from './formData';
import { API_HEADERS_BEARER_TOKEN, API_HEADERS_UNAUTHORIZED, ROOT_URL } from './constants';
import { isEmpty } from 'utils/methods';

export const GET_HOME_FEED = "GET_HOME_FEED";

let token = '641895a64fcaf3dad5773d36725e0a9c722adc88';

export const getHomeFeed = () => {
  return async (dispatch,getState) => {
    let {token} = getState().auth;
    console.log('token: ' , token);
    if(isEmpty(token)) return;
    // let {token} = getState().auth;
    try {
      const response = await axios({
        method: 'GET',
        url: ROOT_URL + '/get_user_home_feed',//PRE_LOGIN_EMAIL_REQUEST,
        headers: API_HEADERS_BEARER_TOKEN(token),
        // params: data,
        // withCredentials: true,
      });
      const responseData = response.data;
      console.log('getHomeFeed : responseData: ' , responseData);
      dispatch({
        type: GET_HOME_FEED,
        data: responseData
      });
    } catch (error) {
      // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
      // throw error.response.data;
    }
  }
};
