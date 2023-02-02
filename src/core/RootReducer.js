import {combineReducers} from '@reduxjs/toolkit';
import {authenticationReducer} from './slice/Authentication';
import {appReducer} from './slice/App';

export const rootReducer = combineReducers({
    authentication: authenticationReducer,
    app: appReducer,
});
