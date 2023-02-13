import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {HttpStatusCode} from 'axios';
import {BASE_URL} from '../Constants';
import {appSelectors} from './App';

const initialState = {
    notifications: [],
    lastIndex: 0,
    count: 10,
};

const notification = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            const payload = action.payload;
            state.notifications = payload;
        },
        pushNotification(state, action) {
            const payload = action.payload;
            state.notifications.unshift(payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(
            notificationOperations.fetchGetListNotifications.fulfilled,
            (state, action) => {
                const payload = action.payload;
                const response = payload.response;
                if (response.status === HttpStatusCode.Ok) {
                    const reloadFlag = payload.reloadFlag;
                    const newList = response.data.data.notifications;
                    if (reloadFlag) {
                        state.notifications = newList;
                        state.lastIndex = 1;
                    } else {
                        const lastList = payload.lastList;
                        state.notifications = mergeNotifications(lastList, newList);
                        state.lastIndex += 1;
                    }
                }
            },
        );
    },
});

export const notificationActions = notification.actions;

const getRoot = state => state.notification;

export const notificationSelectors = {
    getNotification: (state, index) => getRoot(state).notifications[index],
    getAllNotifications: state => getRoot(state).notifications,
    getLastIndex: state => getRoot(state).lastIndex,
    getCount: state => getRoot(state).count,
};

export const notificationOperations = {
    fetchGetListNotifications: createAsyncThunk(
        'post/fetchGetListNotifications',
        async (data, thunkParams) => {
            const {reloadFlag} = data;
            const state = thunkParams.getState();
            const token = appSelectors.getToken(state);
            const lastIndex = notificationSelectors.getLastIndex(state);
            const count = notificationSelectors.getCount(state);
            const lastList = notificationSelectors.getAllNotifications(state);
            if (reloadFlag) {
                const response = await notificationApi.getListNotifications(token, 0, count);
                return {lastList: lastList, response: response, reloadFlag: true};
            } else {
                const response = await notificationApi.getListNotifications(
                    token,
                    lastIndex,
                    count,
                );
                return {lastList: lastList, response: response};
            }
        },
    ),
};

export const notificationReducer = notification.reducer;

export const notificationApi = {
    getListNotifications: async (token, index, count) => {
        const requestBody = {token: token, index: index, count: count};
        const response = await axios.post(BASE_URL + '/it4788/get_notification', requestBody);
        return response;
    },
    setReadNotification: async (token, notificationId) => {
        const requestBody = {token: token, notification_id: notificationId};
        const response = await axios.post(BASE_URL + '/it4788/set_read_notification', requestBody);
        return response;
    },
};

const mergeNotifications = (lastList, newList) => {
    return lastList.concat(newList);
};
