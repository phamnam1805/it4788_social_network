import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import SplashScreen from 'react-native-splash-screen';
import {navigate} from '../Navigation';
import {Routes} from '../Routes';
import {userActions, userOperations, userSelectors} from './User';
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
    getApp: state => getRoot(state),
    getLoading: state => getRoot(state).loading,
    getUserId: state => getRoot(state).userId,
    getToken: state => getRoot(state).token,
};

export const appOperations = {
    initialize: () => async (dispatch, getState) => {
        let appData = await AsyncStorage.getItem('app');
        let userData = await AsyncStorage.getItem('user');
        if (appData && userData) {
            dispatchData(dispatch, appData, userData);
            dispatch(authenticationActions.setAuth(true));
            dispatch(userOperations.fetchUserInfo());
            dispatch(postOperations.createStatusList());
            dispatch(postOperations.fetchGetListPosts({lastId: 0, index: 0, count: 0}));
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
            dispatch(postOperations.fetchGetListPosts({lastId: 0, index: 0, count: 0}));
            const appData = appSelectors.getApp(getState());
            const userData = userSelectors.getUser(getState());
            await saveData(appData, userData);
        },
};

export const appReducer = app.reducer;

const saveData = async (appData, userData) => {
    await AsyncStorage.setItem('app', JSON.stringify(appData));
    await AsyncStorage.setItem('user', JSON.stringify(userData));
};

const dispatchData = (dispatch, appData, userData) => {
    const appDataParsed = JSON.parse(appData);
    const userDataParsed = JSON.parse(userData);
    dispatch(appActions.setToken(appDataParsed.token));
    dispatch(appActions.setUserId(appDataParsed.userId));

    dispatch(userActions.setUsername(userDataParsed.username));
    dispatch(userActions.setAvatar(userDataParsed.avatar));
    dispatch(userActions.setPosts(userDataParsed.posts));
    dispatch(userActions.setFriends(userDataParsed.friends));
};
