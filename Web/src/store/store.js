//REDUX
import {createStore , combineReducers,applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import homeReducer from './reducers/homeReducer';
import communityReducer from './reducers/communityReducer';
import profileReducer from './reducers/profileReducer';
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
  auth: authReducer,
  community: communityReducer,
  profile: profileReducer,
  home: homeReducer,
});


export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(ReduxThunk))); //RemoveThisWhenProductionOccurs
// export const store = createStore(rootReducer,applyMiddleware(ReduxThunk)); //RemoveThisWhenProductionOccurs

export default {
    store
};