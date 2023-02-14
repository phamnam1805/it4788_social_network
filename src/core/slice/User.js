import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {HttpStatusCode} from 'axios';

import {appSelectors} from './App';
import {BASE_URL} from '../Constants';
import {Platform} from 'react-native';

const initialState = {
    username: '',
    avatar: '',
    cover: '',
    address: '',
    city: '',
    country: '',
    description: '',
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
        setCover(state, action) {
            state.cover = action.payload;
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
                state.cover = userData.cover;
                (state.address = userData.address), (state.description = userData.description);
            }
        });
        builder.addCase(userOperations.fetchChangeUserInfo.fulfilled, (state, action) => {
            const response = action.payload;
            if (response.status === HttpStatusCode.Ok) {
                const userData = response.data.data;
                state.username = userData.username;
                state.avatar = userData.avatar;
                state.cover = userData.cover;
                (state.address = userData.address), (state.description = userData.description);
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
    fetchOtherUserInfo: createAsyncThunk('user/fetchOtherUserInfo', async (data, thunkParams) => {
        const {userId} = data;
        // console.error(userId);
        const token = appSelectors.getToken(thunkParams.getState());
        const response = await userApi.getUserInfo(token, userId);
        return response;
    }),
    fetchChangeUserInfo: createAsyncThunk('user/fetchChangeUserInfo', async (data, thunkParams) => {
        const {username, photo, background, description, address} = data;
        const state = thunkParams.getState();

        const token = appSelectors.getToken(state);
        const response = await userApi.changeUserInfo(
            token,
            username,
            photo,
            background,
            description,
            address,
        );
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
    changeUserInfo: async (token, username, photo, background, description, address) => {
        const requestBody = new FormData();
        requestBody.append('token', token);

        if (username) {
            requestBody.append('username', username);
        }

        if (description) {
            requestBody.append('description', description);
        }

        if (address) {
            requestBody.append('address', address);
        }

        if (photo) {
            var image = {
                uri: photo.uri,
                name: photo.fileName,
                type: photo.type,
            };

            console.log(image);
            requestBody.append('avatar', image);
        }

        if (background) {
            var image = {
                uri: background.uri,
                name: background.fileName,
                type: background.type,
            };

            console.log(image);
            requestBody.append('cover', image);
        }

        const response = await axios.post(BASE_URL + '/it4788/set_user_info', requestBody, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
        return response;
    },
};
