import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {HttpStatusCode} from 'axios';
import {BASE_URL} from '../Constants';
import {appSelectors} from './App';

const initialState = {
    posts: [],
};

const post = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(postOperations.fetchListPosts.fulfilled, (state, action) => {
            const response = action.payload;
            if (response.status === HttpStatusCode.Ok) {
                const posts = response.data.data.posts;
                console.log(posts);
                state.posts = posts;
                // state.posts = [...posts];
            }
        });
        builder.addCase(postOperations.fetchListPosts.rejected, (state, action) => {});
        builder.addCase(postOperations.fetchListPosts.pending, (state, action) => {});
    },
});

export const postActions = post.actions;

const getRoot = state => state.post;

export const postSelectors = {
    getPost: state => getRoot(state).posts,
};
export const postOperations = {
    fetchListPosts: createAsyncThunk('post/fetchListPosts', async (data, thunkParams) => {
        const {lastId, index, count} = data;
        const state = thunkParams.getState();
        const userId = appSelectors.getUserId(state);
        const token = appSelectors.getToken(state);
        const requestBody = {
            token: token,
            user_id: userId,
            last_id: lastId,
            index: index,
            count: count,
        };
        const response = await axios.post(BASE_URL + '/it4788/get_list_posts', requestBody);
        return response;
    }),
};

export const postReducer = post.reducer;
