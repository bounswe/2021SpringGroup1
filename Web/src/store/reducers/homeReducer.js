import React from "react";
import { GET_HOME_FEED } from "store/actions/homeAction";
import { LOGOUT } from "../actions/authAction";

const initialState = {
  homeFeed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_FEED:
      return {
        ...state,
        homeFeed: action.data //TODO check this.
      }
    case LOGOUT:
      return {
        ...initialState,
        homeFeed: state.homeFeed
      };
    default:
      return state;
  }
};
