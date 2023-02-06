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
                    state.lastIndex = 0;
                    // Alert.alert('Hehe');
                } else {
                    // Alert.alert('Hehe');
                    const lastList = payload.lastList;
                    const result = mergePosts(lastList, newList);
                    state.posts = result;
                    state.lastIndex = Math.ceil(result.length / state.count);
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
        const {lastId, reloadFlag} = data;
        const state = thunkParams.getState();

        const token = appSelectors.getToken(state);
        const userId = appSelectors.getUserId(state);
        const lastIndex = postSelectors.getLastIndex(state);
        const count = postSelectors.getCount(state);
        const lastList = postSelectors.getPost(state);
        if (reloadFlag) {
            const response = await postApi.getListPosts(token, userId, lastId, 0, count);
            return {lastList: lastList, response: response, reloadFlag: true};
        } else {
            const response = await postApi.getListPosts(token, userId, lastId, lastIndex, count);
            return {lastList: lastList, response: response};
        }
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

const mergePosts = (lastList, newList) => {
    if (newList.length === 0) {
        return lastList;
    }
    const firstItem = newList[0];
    for (let i = lastList.length - 1; i > 0; i--) {
        if (lastList[i].id === firstItem.id) {
            lastList.pop();
            console.log('pop');
        }
    }
    return lastList.concat(newList);
};

export const convertTime = time => {};
