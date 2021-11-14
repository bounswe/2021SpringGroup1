import {urls} from 'DATABASE'
import axios from 'axios';
import {useSelector} from 'react-redux';
import { FORM_DATA_TEXT } from './formData';
import { API_HEADERS_UNAUTHORIZED } from './constants';

export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";


export const logout = () => {
    try {
        // AsyncStorage.removeItem('userData');
    } catch (err) {
        // console.log(err.message);
    }
    return { type: LOGOUT };
}

export const register = (name, email, username, password, passwordConfirm) => {
  return async (dispatch) => {

      }
};

export const login = data => {
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
          type: LOGIN,
          data: responseData
        });
      } catch (error) {
        // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
        // throw error.response.data;
      }
    }
  };