import {
  GET_ME,
} from "../actions/profileAction";


const initialState = {
  profileInfo: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ME:
        return {
            ...state,
            profileInfo: action.data
        }
    default:
      return state;
  }
};
