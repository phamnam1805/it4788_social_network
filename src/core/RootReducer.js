import {combineReducers} from '@reduxjs/toolkit';
import {authenticationReducer} from './slice/Authentication';
import {appReducer} from './slice/App';
import {useReducer} from 'react';
import {userReducer} from './slice/User';

export const rootReducer = combineReducers({
    authentication: authenticationReducer,
    app: appReducer,
    user: userReducer,
});
