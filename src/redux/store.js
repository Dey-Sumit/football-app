import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk'
import { combineReducers } from 'redux'

import auth from './reducers/auth.reducer'
import apiData from './reducers/team.reducer'

const rootReducer = combineReducers({ auth, apiData });


const initialState = {};
const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;