import {
    CREATE_COMMUNITY,
    CREATE_POST,
    CREATE_TEMPLATE,
    JOIN_COMMUNITY,
    GET_COMMUNITIES,
    GET_MY_COMMUNITIES,
    GET_COMMUNITY_DATA,
    LIST_COMMUNITY_POSTS,
    MY_POSTS,
    LIST_POST_TEMPLATES,
    POST_COMMENT,
    CREATE_COMMENT
    FILTER_RESULT
} from "../actions/communityAction";


const initialState = {
    communities: [],
    myCommunities: [],
    communityData: [],
    communityPosts: [],
    myPosts: [],
    postTemplates: [],
    postComments: []
    filterData: []
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
        case FILTER_RESULT:
            return {
                ...state,
                filterData: action.data,
            }
        case GET_COMMUNITY_DATA:
            return {
                ...state,
                communityData: action.data,
            }
        case LIST_COMMUNITY_POSTS:
            return {
                ...state,
                communityPosts: action.data
            }
        case CREATE_POST:
            return {
                ...state,
                //TODO
            }
        case MY_POSTS:
            return {
                ...state,
                myPosts: action.data
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
        case LIST_POST_TEMPLATES:
            return {
                ...state,
                postTemplates: action.data
            }
        case POST_COMMENT:
            return {
                ...state,
                postComments: action.data
            }
        case CREATE_COMMENT:
            return {
                ...state,
            }
        default:
            return state;
    }
};
