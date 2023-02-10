import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {HttpStatusCode} from 'axios';
import {BASE_URL} from '../Constants';
import {appSelectors} from './App';
import {View, Text, Alert} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {postOperations} from './Post';

/**
 * comments = {
 *  postId1: {
 *      listComments: [],
 *      lastIndex: 0,
 *  },
 *  postId2: {
 *      listComments: [],
 *      lastIndex: 0,
 *  }
 * }
 */
const initialState = {
    comments: {},
    count: 10,
};

const comment = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setComment(state, action) {
            const payload = action.payload;
            state.comments[payload.postId] = payload.comment;
        },
        setListComments(state, action) {
            const payload = action.payload;
            state.comments[payload.postId].listComments = payload.listComments;
        },
        setLastIndex(state, action) {
            const payload = action.payload;
            state.comments[payload.postId].lastIndex = payload.lastIndex;
        },
    },
    extraReducers: builder => {
        builder.addCase(commentOperations.fetchGetListComments.fulfilled, (state, action) => {
            const payload = action.payload;
            const response = payload.response;
            if (response.status === HttpStatusCode.Ok) {
                const postId = payload.postId;
                const reloadFlag = payload.reloadFlag;

                const newListComments = response.data.data;
                if (reloadFlag) {
                    state.comments[postId].listComments = newListComments;
                    state.comments[postId].lastIndex = 1;
                } else {
                    state.comments[postId].listComments = mergeComments(
                        payload.lastListComments,
                        newListComments,
                    );
                    state.comments[postId].lastIndex += 1;
                }
            }
        });
        builder.addCase(commentOperations.fetchGetListComments.rejected, (state, action) => {});
        builder.addCase(commentOperations.fetchGetListComments.pending, (state, action) => {});
        builder.addCase(commentOperations.fetchAddComment.fulfilled, (state, action) => {
            const payload = action.payload;
            const response = payload.response;
            if (response.status === HttpStatusCode.Ok) {
                const postId = payload.postId;
                const commentItem = response.data.data;
                state.comments[postId].listComments.unshift(commentItem);
            }
        });
        builder.addCase(commentOperations.fetchAddComment.rejected, (state, action) => {});
        builder.addCase(commentOperations.fetchAddComment.pending, (state, action) => {});
    },
});

export const commentActions = comment.actions;

const getRoot = state => state.comment;

export const commentSelectors = {
    getComment: (state, postId) =>
        getRoot(state).comments[postId] || {lastIndex: 0, listComments: []},
    getComments: state => getRoot(state).comments,
    getCount: state => getRoot(state).count,
};

export const commentOperations = {
    fetchGetListComments: createAsyncThunk(
        'comment/fetchGetListComments',
        async (data, thunkParams) => {
            const {postId, reloadFlag} = data;
            const state = thunkParams.getState();
            const token = appSelectors.getToken(state);
            const commentItem = commentSelectors.getComment(state, postId);
            if (commentItem.listComments.length === 0) {
                const dispatch = thunkParams.dispatch;
                dispatch(
                    commentActions.setComment({
                        postId: postId,
                        comment: {lastIndex: 0, listComments: []},
                    }),
                );
            }
            console.log(commentItem);
            const lastListComments = commentItem.listComments;
            const lastIndex = commentItem.lastIndex;
            const count = commentSelectors.getCount(state);
            if (reloadFlag) {
                const response = await commentApi.getListComments(token, postId, 0, count);
                return {
                    postId: postId,
                    lastListComments: lastListComments,
                    response: response,
                    reloadFlag: true,
                };
            } else {
                const response = await commentApi.getListComments(token, postId, lastIndex, count);
                return {
                    postId: postId,
                    lastListComments: lastListComments,
                    response: response,
                    reloadFlag: false,
                };
            }
        },
    ),
    fetchAddComment: createAsyncThunk('comment/fetchAddComment', async (data, thunkParams) => {
        const {postId, commentContent, postIndex} = data;
        const dispatch = thunkParams.dispatch;
        const state = thunkParams.getState();
        const commentItem = commentSelectors.getComment(state, postId);
        if (commentItem.listComments.length === 0) {
            dispatch(
                commentActions.setComment({
                    postId: postId,
                    comment: {lastIndex: 0, listComments: []},
                }),
            );
        }
        const token = appSelectors.getToken(state);
        const response = await commentApi.addComment(token, postId, commentContent);
        dispatch(postOperations.fetchGetPost({postId: postId, postIndex: postIndex}));
        return {postId: postId, response: response};
    }),
};

export const commentReducer = comment.reducer;

export const commentApi = {
    getListComments: async (token, postId, index, count) => {
        const requestBody = {token: token, id: postId, index: index, count};
        const response = await axios.post(BASE_URL + '/it4788/get_comment', requestBody);
        return response;
    },
    addComment: async (token, postId, commentContent) => {
        const requestBody = {token: token, id: postId, comment: commentContent};
        console.log(requestBody);
        const response = await axios.post(BASE_URL + '/it4788/set_comment', requestBody);
        return response;
    },
};

const mergeComments = (lastList, newList) => {
    // if (newList.length === 0) {
    //     return lastList;
    // }
    // if (lastList.length === 0) {
    //     return newList;
    // }
    // const firstItem = newList[0];
    // const newListTimestamp = getTimestamp(firstItem.created);
    // let i = lastList.length - 1;
    // while (i > 0) {
    //     if (getTimestamp(lastList[i].created) <= newListTimestamp) {
    //         lastList.pop();
    //         i -= 1;
    //     } else {
    //         break;
    //     }
    // }
    return [...lastList, ...newList];
};

const getTimestamp = date => {
    const tmp = new Date(date);
    return tmp.getTime();
};
