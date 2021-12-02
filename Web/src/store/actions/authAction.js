import {urls} from 'DATABASE'
import axios from 'axios';
import {useSelector} from 'react-redux';
import { FORM_DATA_TEXT } from './formData';
import { API_HEADERS_UNAUTHORIZED, ROOT_URL } from './constants';

export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const CLEAN_LOGIN_SUCCEED = "CLEAN_LOGIN_SUCCEED";

export const register = (data) => {
  return async (dispatch,getState) => {
  
    // let {token} = getState().auth;
    const formData = FORM_DATA_TEXT(data);
    try {
      const response = await axios({
        method: 'POST',
        url: ROOT_URL + '/register',//PRE_LOGIN_EMAIL_REQUEST,
        headers: API_HEADERS_UNAUTHORIZED,
        data: formData,
        withCredentials: true,
      });
      const responseData = response.data;
      console.log('responseData: ' , responseData);
      dispatch({
        type: REGISTER,
        data: responseData?.Success
      });
    } catch (error) {
      // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
      // throw error.response.data;
    }
  }
};
let token = '641895a64fcaf3dad5773d36725e0a9c722adc88';

export const login = (data) => {
  return async (dispatch,getState) => {
    
    // let {token} = getState().auth;
    const formData = FORM_DATA_TEXT(data);
    try {
      const response = await axios({
        method: 'POST',
        url: ROOT_URL + '/login',//PRE_LOGIN_EMAIL_REQUEST,
        headers: API_HEADERS_UNAUTHORIZED,
        data: formData,
        withCredentials: true,
      });
      const responseData = response.data;
      console.log('login: responseData: ' , );
      if(!responseData?.Success) {
        alert('Wrong Information. Please Try Again');
        return;
      }
      dispatch({
        type: LOGIN,
        data: responseData?.Token
      });
    } catch (error) {
      // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
      // throw error.response.data;
    }
  }
};

export const logout = () => {
  return async (dispatch,getState) => {
    try {
      const response = await axios({
        method: 'POST',
        url: ROOT_URL + '/logout',//PRE_LOGIN_EMAIL_REQUEST,
        headers: API_HEADERS_UNAUTHORIZED,
        withCredentials: true,
      });
      const responseData = response.data;
      dispatch({
        type: LOGOUT,
      });
    } catch (error) {
      // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
      // throw error.response.data;
    }
  }
};
