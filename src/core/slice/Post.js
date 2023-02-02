import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const post = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action) {
            state = action.payload;
        },
    },
});

export const postActions = post.actions;

const getRoot = state => state.app;

export const postSelectors = {
    getPost: state => getRoot(state),
};
export const postOperations = {};

export const postReducer = post.reducer;
