import {urls} from 'DATABASE'
import axios from 'axios';
import {useSelector} from 'react-redux';
import { FORM_DATA_TEXT } from './formData';
import { API_HEADERS_UNAUTHORIZED } from './constants';

export const CREATE_COMMUNITY = "CREATE_COMMUNITY";
export const JOIN_COMMUNITY = "JOIN_COMMUNITY";
export const CREATE_POST = "CREATE_POST";
export const CREATE_TEMPLATE = "CREATE_TEMPLATE";
export const GET_COMMUNITIES = "GET_COMMUNITIES";
export const GET_MY_COMMUNITIES = "GET_MY_COMMUNITIES";

export const createCommunity = data => {
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
          type: CREATE_COMMUNITY,
          data: responseData
        });
      } catch (error) {
        // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
        // throw error.response.data;
      }
    }
  };


export const createPost = data => {
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
            type: CREATE_POST,
            data: responseData
        });
        } catch (error) {
        // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
        // throw error.response.data;
        }
    }
};

export const joinCommunity = data => {
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
        dispatch({
            type: JOIN_COMMUNITY,
            data: responseData
        });
        } catch (error) {
        // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
        // throw error.response.data;
        }
    }
};

export const createTemplate = data => {
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
        dispatch({
            type: CREATE_TEMPLATE,
            data: responseData
        });
        } catch (error) {
        // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
        // throw error.response.data;
        }
    }
};


export const getCommunities = data => {
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
        dispatch({
            type: GET_COMMUNITIES,
            data: responseData
        });
        } catch (error) {
        // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
        // throw error.response.data;
        }
    }
};

export const getMyCommunities = data => {
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
        dispatch({
            type: GET_MY_COMMUNITIES,
            data: responseData
        });
        } catch (error) {
        // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
        // throw error.response.data;
        }
    }
};