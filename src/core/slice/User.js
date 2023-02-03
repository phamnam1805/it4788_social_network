import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {HttpStatusCode} from 'axios';

import {appSelectors} from './App';
import {BASE_URL} from '../Constants';

const initialState = {
    username: '',
    avatar: '',
    posts: [],
    friends: [],
};

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername(state, action) {
            state.username = action.payload;
        },
        setAvatar(state, action) {
            state.avatar = action.payload;
        },
        setPosts(state, action) {
            state.posts = action.payload;
        },
        setFriends(state, action) {
            state.friends = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(userOperations.fetchUserInfo.fulfilled, (state, action) => {
            const response = action.payload;
            if (response.status === HttpStatusCode.Ok) {
                const userData = response.data.data;
                state.username = userData.username;
                state.avatar = userData.avatar;
            }
        });
    },
});

export const userActions = user.actions;

const getRoot = state => state.user;

export const userSelectors = {
    getUser: state => getRoot(state),
    getUsername: state => getRoot(state).username,
    getAvatar: state => getRoot(state).avatar,
};

export const userOperations = {
    fetchUserInfo: createAsyncThunk('user/fetchUserInfo', async (data, thunkParams) => {
        const token = appSelectors.getToken(thunkParams.getState());
        const userId = appSelectors.getUserId(thunkParams.getState());
        const response = await userApi.getUserInfo(token, userId);
        return response;
    }),
};

export const userReducer = user.reducer;

export const userApi = {
    getUserInfo: async (token, userId) => {
        const requestBody = {
            token: token,
            user_id: userId,
        };
        const response = await axios.post(BASE_URL + '/it4788/get_user_info', requestBody);
        return response;
    },
};
