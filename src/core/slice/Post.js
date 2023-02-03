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
        setPost(state, action) {
            const payload = action.payload;
            state.posts[payload.index] = payload.post;
        },
    },
    extraReducers: builder => {
        builder.addCase(postOperations.fetchListPosts.fulfilled, (state, action) => {
            const response = action.payload;
            if (response.status === HttpStatusCode.Ok) {
                const posts = response.data.data.posts;
                // console.log(posts);
                state.posts = posts;
                // state.posts = [...posts];
            }
        });
        builder.addCase(postOperations.fetchListPosts.rejected, (state, action) => {});
        builder.addCase(postOperations.fetchListPosts.pending, (state, action) => {});
        builder.addCase(postOperations.fetchLikePost.fulfilled, (state, action) => {
            const result = action.payload;
            const response = result.response;
            if (response.status === HttpStatusCode.Ok) {
                const index = result.index;
                state.posts[index] = response.data.data;
            }
        });
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
    fetchLikePost: createAsyncThunk('post/fetchLikePost', async (data, thunkParams) => {
        const {index} = data;
        const token = appSelectors.getToken(thunkParams.getState());
        const postId = postSelectors.getPost(thunkParams.getState())[index].id;
        await postApi.likePost(token, postId);
        return {index: index, response: await postApi.getPost(token, postId)};
    }),
};

export const postReducer = post.reducer;

export const postApi = {
    getPost: async (token, postId) => {
        const requestBody = {
            token: token,
            id: postId,
        };
        const response = await axios.post(BASE_URL + '/it4788/get_post', requestBody);
        return response;
    },
    likePost: async (token, postId) => {
        const requestBody = {
            token: token,
            id: postId,
        };
        const response = await axios.post(BASE_URL + '/it4788/like', requestBody);
        return response;
    },
};
