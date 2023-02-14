import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import SplashScreen from 'react-native-splash-screen';
import messaging, {firebase} from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import {navigate} from '../Navigation';
import {Routes} from '../Routes';
import {userActions, userOperations, userSelectors} from './User';
import {authenticationActions} from './Authentication';
import {postOperations} from './Post';
import {notificationOperations} from './Notification';
import {requestUserPermission, getFcmToken, setupNotificationServices} from '../NotificationUtils';
import NotificationHandler from '../NotificationHandler';
import axios from 'axios';
import { BASE_URL } from '../Constants';

const initialState = {
    loading: true,
    userId: null,
    token: null,
    fcmToken: null,
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
        setFcmToken(state, action) {
            state.fcmToken = action.payload;
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
    getFcmToken: state => getRoot(state).fcmToken,
};

export const appOperations = {
    initialize: () => async (dispatch, getState) => {
        let appData = await AsyncStorage.getItem('app');
        let userData = await AsyncStorage.getItem('user');
        await checkNotiPermission(dispatch);
        await createNotificationListeners(dispatch, getState);
        if (appData && userData) {
            dispatchData(dispatch, appData, userData);
            dispatch(authenticationActions.setAuth(true));
            dispatch(userOperations.fetchUserInfo());
            dispatch(postOperations.createStatusList());
            dispatch(postOperations.fetchGetListPosts({lastId: 0, reloadFlag: true}));
            dispatch(notificationOperations.fetchGetListNotifications({reloadFlag: true}));
        } else {
            await createNotificationListeners(dispatch, null);
            navigate(Routes.LOGIN_SCREEN);
        }
    },
    login:
        ({userId, username, avatar, token}) =>
        async (dispatch, getState) => {
            dispatch(authenticationActions.setAuth(true));
            dispatch(appActions.setUserId(userId));
            dispatch(appActions.setToken(token));
            dispatch(userOperations.fetchUserInfo());
            dispatch(postOperations.fetchGetListPosts({lastId: 0, reloadFlag: true}));
            dispatch(notificationOperations.fetchGetListNotifications({reloadFlag: true}));
            const appData = appSelectors.getApp(getState());
            const userData = userSelectors.getUser(getState());
            await saveData(appData, userData);
        },
    logout: () => async (dispatch, getState) => {

        const fcmToken = appSelectors.getFcmToken(getState());
        const token = appSelectors.getToken(getState());
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('app');
        
        await axios.post(BASE_URL + "/it4788/logout", {
            token: token,
            device_token: fcmToken,
        })

        dispatch(authenticationActions.setAuth(false));
        navigate(Routes.LOGIN_SCREEN);
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

const checkNotiPermission = async dispatch => {
    const enabled = await firebase.messaging().hasPermission();
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (enabled) {
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
                dispatch(appActions.setFcmToken(fcmToken));
            }
        } else {
            dispatch(appActions.setFcmToken(fcmToken));
        }
    } else {
        const permission = await requestUserPermission();
        if (permission) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
                dispatch(appActions.setFcmToken(fcmToken));
            }
        }
    }
};

const createNotificationListeners = async (dispatch, getState) => {
    PushNotification.createChannel(
        {
            channelId: 'fcm_fallback_notification_channel', // (required)
            channelName: 'Default', // (required)
            channelDescription: 'Default channel', // (optional) default: undefined.
            playSound: false, // (optional) default: true
            soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    messaging().onMessage(async remoteMessage => {
        await NotificationHandler.onNotificationReceived(dispatch, getState, remoteMessage);
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        if (remoteMessage) {
            console.log(
                'Notification caused app to open from background:',
                remoteMessage.notification,
            );
        }
    });
};
