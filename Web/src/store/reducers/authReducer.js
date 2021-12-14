import React from "react";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CLEAN_LOGIN_SUCCEED
} from "../actions/authAction";


const initialState = {
  isLogin: false,
  isRegistered: false,
  isLoginSucceed: false,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    localStorage.setItem('token', action.data)
      return {
        ...state,
        token: action.data, //TODO check this.
        isLoginSucceed: !!action.data
      }
    case REGISTER:
      return {
        ...state,
        isRegistered: action.data
      }
    case CLEAN_LOGIN_SUCCEED:
      return {
        ...state,
        isLoginSucceed: false //TODO check this.
      }
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
