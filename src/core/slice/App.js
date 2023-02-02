import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import SplashScreen from 'react-native-splash-screen';
import {navigate} from '../Navigation';
import {Routes} from '../Routes';
import {userActions} from './User';
import {authenticationActions} from './Authentication';
import {postOperations} from './Post';

const initialState = {
    loading: true,
    userId: null,
    token: null,
};

const app = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setUserId(state, action) {
            state.userId = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
    },
});

export const appActions = app.actions;

const getRoot = state => state.app;

export const appSelectors = {
    getLoading: state => getRoot(state).loading,
    getUserId: state => getRoot(state).userId,
    getToken: state => getRoot(state).token,
};

export const appOperations = {
    initialize: () => async (dispatch, getState) => {
        let userId = await AsyncStorage.getItem('userId');
        let token = await AsyncStorage.getItem('token');

        if (token && userId) {
            dispatch(authenticationActions.setAuth(true));
            dispatch(appActions.setUserId(userId));
            dispatch(appActions.setToken(token));
            dispatch(postOperations.fetchListPosts({lastId: 0, index: 0, count: 0}));
        } else {
            navigate(Routes.LOGIN_SCREEN);
        }
    },
    login:
        ({userId, username, avatar, token}) =>
        async (dispatch, getState) => {
            dispatch(authenticationActions.setAuth(true));
            dispatch(appActions.setUserId(userId));
            dispatch(appActions.setToken(token));
            dispatch(userActions.setUsername(username));
            dispatch(userActions.setAvatar(avatar));
            dispatch(postOperations.fetchListPosts({lastId: 0, index: 0, count: 0}));
            await AsyncStorage.setItem('userId', userId);
            await AsyncStorage.setItem('token', token);
        },
};

export const appReducer = app.reducer;
