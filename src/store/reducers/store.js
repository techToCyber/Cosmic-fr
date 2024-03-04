import {createStore, combineReducers, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleWare from "redux-thunk"
import  graphReducer  from './graphReducer';

const reducer = combineReducers({
    graph: graphReducer,
});

const initialState = {};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleWare)));

export default store;