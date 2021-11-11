import React from "react";
import {
  UPDATE_USER,
  LOGIN,
  LOGOUT,
  UPDATE_PROFILE,
  CURRENT_USER,
} from "../actions/auth";


const initialState = {
  accessToken: null,
  currentUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        accessToken: action.accessToken
      }
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser
      }
    case UPDATE_PROFILE:
      return {
        ...state,
        token: action.user.token,
        user: action.user,
      };
    case UPDATE_USER:
      let updatedAllUsers = state.allUsers;
      let index = updatedAllUsers.findIndex(
        (user) => user.username === action.user.username
      );
      updatedAllUsers[index] = action.user;
      return {
        ...state,
        allUsers: updatedAllUsers,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
