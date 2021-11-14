import {urls} from 'DATABASE'
import axios from 'axios';
import { FORM_DATA_TEXT } from './formData';
import { API_HEADERS_UNAUTHORIZED } from './constants';

export const GET_ME = "GET_ME";


export const getMe = data => {
    return async (dispatch,getState) => {
      // let {token} = getState().auth;
      const formData = FORM_DATA_TEXT(data);
      try {
        const response = await axios({
          method: 'POST',
          url: '',//PRE_LOGIN_EMAIL_REQUEST,
          headers: API_HEADERS_UNAUTHORIZED,
          data: formData,
        //   withCredentials: true,
        });
        const responseData = response.data;
        console.log('responseData: ' , responseData);
        dispatch({
          type: GET_ME,
          data: responseData
        });
      } catch (error) {
        // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
        // throw error.response.data;
      }
    }
  };