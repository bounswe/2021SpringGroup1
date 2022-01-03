import {urls} from 'DATABASE'
import axios from 'axios';
import { FORM_DATA_TEXT } from './formData';
import { API_HEADERS_BEARER_TOKEN, API_HEADERS_UNAUTHORIZED, ROOT_URL } from './constants';
import { isEmpty } from 'utils/methods';

export const GET_ME = "GET_ME";


export const getMe = (id = "") => {
    return async (dispatch,getState) => {
      let {token} = getState().auth;
      if(isEmpty(token)) return;
      // const formData = FORM_DATA_TEXT(data);
      let userId = isEmpty(id) ? '' : '/' + id;
      try {
        const response = await axios({
          method: 'GET',
          url: ROOT_URL + '/get_user_profile' + userId,//PRE_LOGIN_EMAIL_REQUEST,
          headers: API_HEADERS_BEARER_TOKEN(token),
          // data: formData,
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