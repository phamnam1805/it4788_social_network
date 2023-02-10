import {combineReducers} from '@reduxjs/toolkit';
import {authenticationReducer} from './slice/Authentication';
import {appReducer} from './slice/App';
import {useReducer} from 'react';
import {userReducer} from './slice/User';
import {postReducer} from './slice/Post';
import {commentReducer} from './slice/Comment';

export const rootReducer = combineReducers({
    authentication: authenticationReducer,
    app: appReducer,
    user: userReducer,
    post: postReducer,
    comment: commentReducer,
});
