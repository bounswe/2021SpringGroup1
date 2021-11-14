import {
  CREATE_COMMUNITY,
  CREATE_POST,
  CREATE_TEMPLATE,
  JOIN_COMMUNITY,
  GET_COMMUNITIES,
  GET_MY_COMMUNITIES
} from "../actions/community";


const initialState = {
  communities: [],
  myCommunities: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMUNITY:
        return {
            ...state,
            communities: action.data
        }
    case CREATE_POST:
        return {
            ...state,
        }
    case CREATE_TEMPLATE:
        return {
            ...state,
        }
    case JOIN_COMMUNITY:
        return {
            ...state,
            communities: action.accessToken
        }
    case GET_COMMUNITIES:
        return {
            ...state,
            communities: action.data
        }
    case GET_MY_COMMUNITIES:
        return {
            ...state,
            myCommunities: action.data
        }
    default:
      return state;
  }
};
