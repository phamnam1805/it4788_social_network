import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {HttpStatusCode} from 'axios';
import {BASE_URL} from '../Constants';
import {appSelectors} from './App';
import {View, Text} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const initialState = {
    posts: [],
    statusContent: {
        'emoticon-confused-outline': 'feeling confused',
        'emoticon-cool-outline': 'feeling cool',
        'emoticon-happy-outline': 'feeling happy',
        'emoticon-sad-outline': 'feeling sad',
    },
    statusList: [],
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
        setStatusList(state, action) {
            const payload = action.payload;
            state.statusList = payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(postOperations.fetchGetListPosts.fulfilled, (state, action) => {
            const response = action.payload;
            if (response.status === HttpStatusCode.Ok) {
                const posts = response.data.data.posts;
                // console.log(posts);
                state.posts = posts;
                // state.posts = [...posts];
            }
        });
        builder.addCase(postOperations.fetchGetListPosts.rejected, (state, action) => {});
        builder.addCase(postOperations.fetchGetListPosts.pending, (state, action) => {});
        builder.addCase(postOperations.fetchLikePost.fulfilled, (state, action) => {
            const result = action.payload;
            const response = result.response;
            if (response.status === HttpStatusCode.Ok) {
                const index = result.index;
                state.posts[index] = response.data.data;
            }
        });
        builder.addCase(postOperations.fetchAddPost.fulfilled, (state, action) => {
            const response = action.payload;
            if (response.status === HttpStatusCode.Ok) {
                console.log(response);
            }
        });
    },
});

export const postActions = post.actions;

const getRoot = state => state.post;

export const postSelectors = {
    getPost: state => getRoot(state).posts,
    getStatusContent: state => getRoot(state).statusContent,
    getStatusList: state => getRoot(state).statusList,
};
export const postOperations = {
    createStatusList: () => async (dispatch, getState) => {
        const statusContent = postSelectors.getStatusContent(getState());
        const statusArr = [];
        for (var key in statusContent) {
            if (statusContent.hasOwnProperty(key)) {
                statusArr.push({
                    key: key,
                    label: statusContent[key],
                    component: (
                        <View style={{alignItems: 'center'}}>
                            <Text style={{color: '#1493ff', fontSize: 20}}>
                                {statusContent[key] + ' '}
                                <MaterialCommunityIcon
                                    size={30}
                                    name={key}
                                    // style={styles.optionImage}
                                    color="#bd9cf1"
                                />
                            </Text>
                        </View>
                    ),
                });
            }
        }
        statusArr.push({
            key: 'nothing',
            label: 'nothing',
            component: (
                <View style={{alignItems: 'center'}}>
                    <Text style={{color: '#1493ff', fontSize: 20}}>nothing</Text>
                </View>
            ),
        });
        dispatch(postActions.setStatusList(statusArr));
    },
    fetchGetListPosts: createAsyncThunk('post/fetchGetListPosts', async (data, thunkParams) => {
        const {lastId, index, count} = data;
        const state = thunkParams.getState();
        const userId = appSelectors.getUserId(state);
        const token = appSelectors.getToken(state);
        const response = await postApi.getListPosts(token, userId, lastId, index, count);
        return response;
    }),
    fetchLikePost: createAsyncThunk('post/fetchLikePost', async (data, thunkParams) => {
        const {index} = data;
        const token = appSelectors.getToken(thunkParams.getState());
        const postId = postSelectors.getPost(thunkParams.getState())[index].id;
        await postApi.likePost(token, postId);
        return {index: index, response: await postApi.getPost(token, postId)};
    }),
    fetchAddPost: createAsyncThunk('post/fetchAddPost', async (data, thunkParams) => {
        const {content, status, photos, video} = data;
        const token = appSelectors.getToken(thunkParams.getState());
        const response = await postApi.addPost(token, content, status, photos, video);
        return response;
    }),
};

export const postReducer = post.reducer;

export const postApi = {
    getListPosts: async (token, userId, lastId, index, count) => {
        const requestBody = {
            token: token,
            user_id: userId,
            last_id: lastId,
            index: index,
            count: count,
        };
        const response = await axios.post(BASE_URL + '/it4788/get_list_posts', requestBody);
        return response;
    },
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
    addPost: async (token, describe, status, photos, video) => {
        const requestBody = new FormData();
        requestBody.append('token', token);
        requestBody.append('describe', describe);
        requestBody.append('status', status);
        if (photos) {
            for (let i = 0; i < photos.length; i++) {
                const photo = photos[i];
                const image = {
                    uri: photo.uri,
                    name: photo.fileName,
                    type: photo.type,
                };
                requestBody.append('image', image);
            }
        } else if (video) {
            requestBody.append('video', {uri: video.uri, name: video.fileName, type: video.type});
        }
        console.log(requestBody);
        const response = await axios.post(BASE_URL + '/it4788/add_post', requestBody, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
        return response;
    },
};
