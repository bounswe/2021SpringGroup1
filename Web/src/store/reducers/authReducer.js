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
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoginSucceed: action.data //TODO check this.
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
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
