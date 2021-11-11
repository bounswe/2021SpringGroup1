//REDUX
import {createStore , combineReducers,applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './reducers/auth';
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
  auth: authReducer
});


export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(ReduxThunk))); //RemoveThisWhenProductionOccurs
// export const store = createStore(rootReducer,applyMiddleware(ReduxThunk)); //RemoveThisWhenProductionOccurs

export default {
    store
};