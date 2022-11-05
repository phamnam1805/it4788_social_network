import {createStore, applyMiddleware, compose} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducers';
import thunk from 'redux-thunk';
const middleWares = [thunk];
const enhancers = [applyMiddleware(...middleWares)];
// let store = createStore(reducer, compose(...enhancers));
let store = configureStore(reducer, compose(...enhancers));
export default store;
