import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {HttpStatusCode} from 'axios';
import {BASE_URL} from '../Constants';
import {appSelectors} from './App';
import {View, Text, Alert} from 'react-native';
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
    lastIndex: 0,
    count: 10,
};

const post = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action) {
            if (action.payload) {
                state.posts = action.payload;
            } else {
                state.posts = [];
            }
        },
        setPost(state, action) {
            const payload = action.payload;
            state.posts[payload.index] = payload.post;
        },
        setStatusList(state, action) {
            const payload = action.payload;
            state.statusList = payload;
        },
        setLastIndex(state, action) {
            const payload = action.payload;
            state.lastIndex = payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(postOperations.fetchGetListPosts.fulfilled, (state, action) => {
            const payload = action.payload;
            const response = payload.response;
            if (response.status === HttpStatusCode.Ok) {
                const newList = response.data.data.posts;
                const reloadFlag = payload.reloadFlag;
                if (reloadFlag) {
                    state.posts = newList;
                    state.lastIndex = 1;
                } else {
                    state.posts = mergePosts(payload.lastList, newList);
                    state.lastIndex += 1;
                }
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
                const postItem = response.data.data;
                // console.log(response);
                state.posts.unshift(postItem);
            }
        });
        builder.addCase(postOperations.fetchGetPost.fulfilled, (state, action) => {
            const payload = action.payload;
            const response = payload.response;
            if (response.status === HttpStatusCode.Ok) {
                const postIndex = payload.postIndex;
                state.posts[postIndex] = response.data.data;
            }
        });
        builder.addCase(postOperations.fetchDeletePost.fulfilled, (state, action) => {
            const payload = action.payload;
            const response = payload.response;
            if (response.status === HttpStatusCode.Ok) {
                const index = payload.index;
                state.posts.splice(index, 1);
                alert('Post deleted');
            }
        });
    },
});

export const postActions = post.actions;

const getRoot = state => state.post;

export const postSelectors = {
    getPost: (state, index) => getRoot(state).posts[index],
    getAllPosts: state => getRoot(state).posts,
    getStatusContent: state => getRoot(state).statusContent,
    getStatusList: state => getRoot(state).statusList,
    getLastIndex: state => getRoot(state).lastIndex,
    getCount: state => getRoot(state).count,
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
                                    size={35}
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
        const {lastId, reloadFlag, userId} = data;
        const state = thunkParams.getState();
        const token = appSelectors.getToken(state);
        const lastIndex = postSelectors.getLastIndex(state);
        const count = postSelectors.getCount(state);
        const lastList = postSelectors.getAllPosts(state);
        if (reloadFlag) {
            const response = await postApi.getListPosts(token, userId, lastId, 0, count);
            return {lastList: lastList, response: response, reloadFlag: true};
        } else {
            const response = await postApi.getListPosts(token, userId, lastId, lastIndex, count);
            return {lastList: lastList, response: response};
        }
    }),
    fetchGetPost: createAsyncThunk('post/fetchGetPost', async (data, thunkParams) => {
        const {postId, postIndex} = data;
        const state = thunkParams.getState();

        const token = appSelectors.getToken(state);
        const response = await postApi.getPost(token, postId);
        return {postIndex: postIndex, response: response};
    }),
    fetchLikePost: createAsyncThunk('post/fetchLikePost', async (data, thunkParams) => {
        const {index} = data;
        const token = appSelectors.getToken(thunkParams.getState());
        const postId = postSelectors.getPost(thunkParams.getState(), index).id;
        await postApi.likePost(token, postId);
        return {index: index, response: await postApi.getPost(token, postId)};
    }),
    fetchAddPost: createAsyncThunk('post/fetchAddPost', async (data, thunkParams) => {
        const {content, status, photos, video} = data;
        const token = appSelectors.getToken(thunkParams.getState());
        const response = await postApi.addPost(token, content, status, photos, video);
        return response;
    }),
    fetchDeletePost: createAsyncThunk('post/fetchDeletePost', async (data, thunkParams) => {
        const {index} = data;
        const token = appSelectors.getToken(thunkParams.getState());
        const postId = postSelectors.getPost(thunkParams.getState(), index).id;
        const response = await postApi.deletePost(token, postId);
        return {index: index, response: response};
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
                console.error(image);
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
    deletePost: async (token, postId) => {
        const requestBody = {token: token, id: postId};
        const response = await axios.post(BASE_URL + '/it4788/delete_post', requestBody);
        return response;
    },
};

const mergePosts = (lastList, newList) => {
    return lastList.concat(newList);
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
    // return [...lastList, ...newList];
};

const getTimestamp = date => {
    const tmp = new Date(date);
    return tmp.getTime();
};
