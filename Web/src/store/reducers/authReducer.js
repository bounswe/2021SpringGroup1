import React from "react";
import {
  LOGIN,
  LOGOUT,
} from "../actions/authAction";


const initialState = {
  isLogin: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: action.data //TODO check this.
      }
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
