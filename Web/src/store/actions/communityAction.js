import { urls } from 'DATABASE'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FORM_DATA_TEXT } from './formData';
import { API_HEADERS_BEARER_TOKEN, API_HEADERS_UNAUTHORIZED, ROOT_URL } from './constants';
import { isEmpty } from 'utils/methods';

export const CREATE_COMMUNITY = "CREATE_COMMUNITY";
export const JOIN_COMMUNITY = "JOIN_COMMUNITY";
export const CREATE_POST = "CREATE_POST";
export const CREATE_TEMPLATE = "CREATE_TEMPLATE";
export const GET_COMMUNITIES = "GET_COMMUNITIES";
export const GET_MY_COMMUNITIES = "GET_MY_COMMUNITIES";
export const GET_COMMUNITY_DATA = "GET_COMMUNITY_DATA";
export const LIST_COMMUNITY_POSTS = "LIST_COMMUNITY_POSTS";
export const MY_POSTS = "MY_POSTS";
export const LIST_POST_TEMPLATES = "LIST_POST_TEMPLATES";
export const POST_COMMENT = "POST_COMMENT";
export const CREATE_COMMENT = "CREATE_COMMENT";


let token = '641895a64fcaf3dad5773d36725e0a9c722adc88';


export const createCommunity = data => {
    return async (dispatch, getState) => {
        let { token } = getState().auth;
        if (isEmpty(token)) return;
        const formData = FORM_DATA_TEXT(data);
        try {
            const response = await axios({
                method: 'POST',
                url: ROOT_URL + '/create_community',//PRE_LOGIN_EMAIL_REQUEST,
                headers: API_HEADERS_BEARER_TOKEN(token),
                data: formData,
                withCredentials: true,
            });
            const responseData = response.data;
            console.log('responseData: ', responseData);
            return (responseData);
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
    return async (dispatch, getState) => {
        let { token } = getState().auth;
        if (isEmpty(token)) return;
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

export const createTemplate = (formData, id) => {
    return async (dispatch, getState) => {
        let { token } = getState().auth;
        if (isEmpty(token)) return;
        //        const formData = FORM_DATA_TEXT(data);
        try {
            const response = await axios({
                method: 'POST',
                url: ROOT_URL + '/communities/' + id + '/create_post_template',//PRE_LOGIN_EMAIL_REQUEST,
                headers: API_HEADERS_BEARER_TOKEN(token),
                data: formData,
                withCredentials: true,
            });
            const responseData = response.data;
            console.log("createTEmplateResponseData:", responseData);
            return (responseData);

            dispatch({
                type: CREATE_TEMPLATE,
                data: formData
            });
        } catch (error) {
            // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
            // throw error.response.data;
        }
    }
};


export const getCommunities = (data) => {
    return async (dispatch, getState) => {
        let { token } = getState().auth;
        if (isEmpty(token)) return;
        console.log('data: token, ', data, token);
        // const formData = FORM_DATA_TEXT(data);
        try {
            const response = await axios({
                method: 'GET',
                url: ROOT_URL + '/list_communities',//PRE_LOGIN_EMAIL_REQUEST,
                headers: API_HEADERS_BEARER_TOKEN(token),
                params: data,
                withCredentials: true,
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

export const getMyCommunities = (data) => {
    return async (dispatch, getState) => {
        let { token } = getState().auth;
        if (isEmpty(token)) return;
        console.log('data: token, ', data, token);
        // const formData = FORM_DATA_TEXT(data);
        try {
            const response = await axios({
                method: 'GET',
                url: ROOT_URL + '/list_communities',//PRE_LOGIN_EMAIL_REQUEST,
                headers: API_HEADERS_BEARER_TOKEN(token),
                params: data,
                withCredentials: true,
            });
            const responseData = response.data;
            dispatch({
                type: GET_MY_COMMUNITIES,
                data: { "Communities": responseData }
            });
        } catch (error) {
            // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
            // throw error.response.data;
        }
    }
};

//TODO getCommunityData
export const getCommunityData = (id) => {
    return async (dispatch, getState) => {
        let { token } = getState().auth;
        if (isEmpty(token)) return;
        // const formData = FORM_DATA_TEXT(data);
        try {
            const response = await axios({
                method: 'GET',
                url: ROOT_URL + '/communities/' + id + '/get_community_data',//PRE_LOGIN_EMAIL_REQUEST,
                headers: API_HEADERS_BEARER_TOKEN(token),
                params: { community_id: id },
                //   withCredentials: true,
            });
            const responseData = response.data;
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
export const filterPostsRedux = (communityId, params) => {
    return async (dispatch, getState) => {
        let { token } = getState().auth;
        if (isEmpty(token)) return;
        // const formData = FORM_DATA_TEXT(data);
        try {
            const response = await axios({
                method: 'GET',
                url: ROOT_URL + '/communities/' + communityId + '/filter_posts',//PRE_LOGIN_EMAIL_REQUEST,
                headers: API_HEADERS_BEARER_TOKEN(token),
                params: params,
                //   withCredentials: true,
            });
            const responseData = response.data;
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
    return async (dispatch, getState) => {
        let { token } = getState().auth;
        if (isEmpty(token)) return;
        // const formData = FORM_DATA_TEXT(data);
        try {
            const response = await axios({
                method: 'GET',
                url: ROOT_URL + '/communities/' + id + '/list_community_posts',//PRE_LOGIN_EMAIL_REQUEST,
                // headers: API_HEADERS_UNAUTHORIZED,
                params: { community_id: id },
                //   withCredentials: true,
            });
            const responseData = response.data;
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
export const createPost = (data, id) => {
    return async (dispatch, getState) => {
        let { token } = getState().auth;
        if (isEmpty(token)) return;
        // const formData = FORM_DATA_TEXT(data);
        try {
            const response = await axios({
                method: 'POST',
                url: ROOT_URL + '/communities/' + id + '/create_post',//PRE_LOGIN_EMAIL_REQUEST,
                headers: API_HEADERS_BEARER_TOKEN(token),
                data: data,
                withCredentials: true,
            });
            const responseData = response.data;
            console.log('createPost: responseData: ', responseData);
            return (responseData);
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
    return async (dispatch, getState) => {
        let { token } = getState().auth;
        if (isEmpty(token)) return;
        // const formData = FORM_DATA_TEXT(data);
        try {
            const response = await axios({
                method: 'GET',
                url: ROOT_URL + '/get_user_created_posts',//PRE_LOGIN_EMAIL_REQUEST,
                headers: API_HEADERS_BEARER_TOKEN(token),
                // data: formData,
                withCredentials: true,
            });
            const responseData = response.data;
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


export const checkSubscribeCommunity = (id) => {
    return async (dispatch, getState) => {
        let { token } = getState().auth;
        if (isEmpty(token)) return;
        // const formData = FORM_DATA_TEXT(data);
        try {
            const response = await axios({
                method: 'GET',
                url: ROOT_URL + `/communities/${id}/user_subscription`,//PRE_LOGIN_EMAIL_REQUEST,
                headers: API_HEADERS_BEARER_TOKEN(token),
                // params: formData,
                // withCredentials: true,
            });
            const responseData = response.data;
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


export const subscribeCommunity = (id, isJoined) => {
    return async (dispatch, getState) => {
        let { token } = getState().auth;
        if (isEmpty(token)) return;
        // const formData = FORM_DATA_TEXT(data);
        let data = {
            action: isJoined ? 'leave' : 'join',
            community_id: id
        };

        try {
            const response = await axios({
                method: 'PUT',
                url: ROOT_URL + `/communities/${id}/user_subscription`,//PRE_LOGIN_EMAIL_REQUEST,
                headers: API_HEADERS_BEARER_TOKEN(token),
                params: data,
                // withCredentials: true,
            });
            const responseData = response.data;
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

export const searchCommunities = (data) => {
    return async (dispatch, getState) => {
        let { token } = getState().auth;
        if (isEmpty(token)) return;
        console.log('data: token, ', data, token);
        // const formData = FORM_DATA_TEXT(data);
        try {
            const response = await axios({
                method: 'GET',
                url: ROOT_URL + '/search_communities',//PRE_LOGIN_EMAIL_REQUEST,
                headers: API_HEADERS_BEARER_TOKEN(token),
                params: data,
                withCredentials: true,
            });
            const responseData = response.data;
            dispatch({
                type: GET_COMMUNITIES,
                data: { Communities: responseData }
            });
        } catch (error) {
            // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
            // throw error.response.data;
        }
    }
};

//TODO getCommunityData
export const listPostTemplates = (id) => {
    return async (dispatch, getState) => {
        let { token } = getState().auth;
        if (isEmpty(token)) return;
        // const formData = FORM_DATA_TEXT(data);
        try {
            const response = await axios({
                method: 'GET',
                url: ROOT_URL + '/communities/' + id + '/list_post_templates',//PRE_LOGIN_EMAIL_REQUEST,
                headers: API_HEADERS_BEARER_TOKEN(token),
                params: { community_id: id },
                //   withCredentials: true,
            });
            const responseData = response.data;
            console.log('getPostTemplates: responseData: ', responseData);
            dispatch({
                type: LIST_POST_TEMPLATES,
                data: responseData
            });
        } catch (error) {
            // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
            // throw error.response.data;
        }
    }
};

//TODO getCommunityData
export const getPostComments = (id) => {
    return async (dispatch, getState) => {
        let { token } = getState().auth;
        if (isEmpty(token)) return;
        // const formData = FORM_DATA_TEXT(data);
        try {
            const response = await axios({
                method: 'GET',
                url: ROOT_URL + '/communities/get_post_data',//PRE_LOGIN_EMAIL_REQUEST,
                headers: API_HEADERS_BEARER_TOKEN(token),
                params: { post_id: id },
                // data: formData,
                withCredentials: true,
            });
            const responseData = response.data;
            console.log('get_post_data: responseData: ', responseData);
            dispatch({
                type: POST_COMMENT,
                data: responseData
            });
        } catch (error) {
            // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
            // throw error.response.data;
        }
    }
};


//TODO getCommunityData
export const sendCommentBackend = (data) => {

    return async (dispatch, getState) => {
        console.log("req: ", data);

        let { token } = getState().auth;
        if (isEmpty(token)) return;
        const formData = FORM_DATA_TEXT(data);
        try {
            const response = await axios({
                method: 'POST',
                url: ROOT_URL + '/communities/create_comment',//PRE_LOGIN_EMAIL_REQUEST,
                headers: API_HEADERS_BEARER_TOKEN(token),
               // params: data,
                data: formData,
                //withCredentials: true,
            });
            const responseData = response.data;
            console.log('create_post: responseData: ', responseData);
            dispatch({
                type: CREATE_COMMENT,
                data: responseData
            });
        } catch (error) {
            // dispatch({ type: SIGN_UP_CREATE_MESSAGE, messageCode: error?.response?.data?.code });
            // throw error.response.data;
        }
    }
};


