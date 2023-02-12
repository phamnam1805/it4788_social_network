import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {HttpStatusCode} from 'axios';
import {BASE_URL} from '../Constants';

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

export const notificationOperations = {};

export const notificationReducer = notification.reducer;

export const notificationApi = {};
