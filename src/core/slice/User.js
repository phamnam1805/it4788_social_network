import {createSlice} from '@reduxjs/toolkit';

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
    },
});

export const userActions = user.actions;

const getRoot = state => state.app;

export const appSelectors = {
    getUsername: state => getRoot(state).username,
    getAvatar: state => getRoot(state).avatar,
};

export const userOperations = {};

export const userReducer = user.reducer;
