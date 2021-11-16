import {urls} from 'DATABASE'
import axios from 'axios';
import {useSelector} from 'react-redux';
import { FORM_DATA_TEXT } from './formData';
import { API_HEADERS_UNAUTHORIZED, ROOT_URL } from './constants';

export const CREATE_COMMUNITY = "CREATE_COMMUNITY";
export const JOIN_COMMUNITY = "JOIN_COMMUNITY";
export const CREATE_POST = "CREATE_POST";
export const CREATE_TEMPLATE = "CREATE_TEMPLATE";
export const GET_COMMUNITIES = "GET_COMMUNITIES";
export const GET_MY_COMMUNITIES = "GET_MY_COMMUNITIES";
export const GET_COMMUNITY_DATA = "GET_COMMUNITY_DATA";
export const LIST_COMMUNITY_POSTS = "LIST_COMMUNITY_POSTS";
export const MY_POSTS = "MY_POSTS";

export const createCommunity = data => {
    return async (dispatch,getState) => {
      // let {token} = getState().auth;
      const formData = FORM_DATA_TEXT(data);
      try {
        const response = await axios({
          method: 'POST',
          url: ROOT_URL + '/create_community',//PRE_LOGIN_EMAIL_REQUEST,
          headers: API_HEADERS_UNAUTHORIZED,
          data: formData,
          withCredentials: true,
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


export const getCommunities = () => {
    return async (dispatch,getState) => {
        // let {token} = getState().auth;
        // const formData = FORM_DATA_TEXT(data);
        try {
        const response = await axios({
            method: 'GET',
            url: ROOT_URL + '/list_communities',//PRE_LOGIN_EMAIL_REQUEST,
            headers: API_HEADERS_UNAUTHORIZED,
            params: {from: 'all'},
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

export const getMyCommunities = () => {
    return async (dispatch,getState) => {
        // let {token} = getState().auth;
        // const formData = FORM_DATA_TEXT(data);
        try {
        const response = await axios({
            method: 'POST',
            url: '',//PRE_LOGIN_EMAIL_REQUEST,
            headers: API_HEADERS_UNAUTHORIZED,
            // data: formData,
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

//TODO getCommunityData
export const getCommunityData = (id) => {
    return async (dispatch,getState) => {
        // let {token} = getState().auth;
        // const formData = FORM_DATA_TEXT(data);
        try {
        const response = await axios({
            method: 'GET',
            url: ROOT_URL + '/communities/' + id + '/get_community_data',//PRE_LOGIN_EMAIL_REQUEST,
            // headers: API_HEADERS_UNAUTHORIZED,
            params: {community_id: id},
        //   withCredentials: true,
        });
        const responseData = response.data;
        console.log('getCommunityData: responseData: ' , responseData);
        dispatch({
            type: GET_COMMUNITY_DATA,
            data: responseData
        });
        } catch (error) {
        // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
        // throw error.response.data;
        }
    }
};

//TODO getCommunityData
export const listCommunityPosts = (id) => {
    return async (dispatch,getState) => {
        // let {token} = getState().auth;
        // const formData = FORM_DATA_TEXT(data);
        try {
        const response = await axios({
            method: 'GET',
            url: ROOT_URL + '/communities/' + id + '/list_community_posts',//PRE_LOGIN_EMAIL_REQUEST,
            // headers: API_HEADERS_UNAUTHORIZED,
            params: {community_id: id},
        //   withCredentials: true,
        });
        const responseData = response.data;
        console.log('getCommunityData: responseData: ' , responseData);
        dispatch({
            type: LIST_COMMUNITY_POSTS,
            data: responseData
        });
        } catch (error) {
        // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
        // throw error.response.data;
        }
    }
};


//TODO getCommunityData
export const createPost = (data) => {
    return async (dispatch,getState) => {
        // let {token} = getState().auth;
        const formData = FORM_DATA_TEXT(data);
        try {
        const response = await axios({
            method: 'GET',
            url: ROOT_URL + '/communities/' + data.id + '/create_post',//PRE_LOGIN_EMAIL_REQUEST,
            headers: API_HEADERS_UNAUTHORIZED,
            data: formData,
            withCredentials: true,
        });
        const responseData = response.data;
        console.log('getCommunityData: responseData: ' , responseData);
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

//TODO getCommunityData
export const getMyPosts = () => {
    return async (dispatch,getState) => {
        // let {token} = getState().auth;
        // const formData = FORM_DATA_TEXT(data);
        try {
        const response = await axios({
            method: 'GET',
            url: ROOT_URL + '/get_user_created_posts',//PRE_LOGIN_EMAIL_REQUEST,
            // headers: API_HEADERS_UNAUTHORIZED,
            // data: formData,
            withCredentials: true,
        });
        const responseData = response.data;
        console.log('getCommunityData: responseData: ' , responseData);
        dispatch({
            type: MY_POSTS,
            data: responseData
        });
        } catch (error) {
        // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
        // throw error.response.data;
        }
    }
};