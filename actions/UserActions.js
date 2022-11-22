import {UserActions, BASE_URL} from '../constants';
import axios from 'axios';

export const FetchUserData = (token, userId) => {
    const requestBody = {
        token: token,
        user_id: userId,
    };
    return dispatch => {
        dispatch(FetchDefaultState());
        axios
            .post(BASE_URL + '/it4788/get_user_info', requestBody)
            .then(response => {
                const responseData = response.data;
                const userData = responseData['data'];
                dispatch(FetchUserDataSuccess(userData));
                dispatch(FetchFriendsRequest(token, userId));
                dispatch(FetchProfilePostsRequest(token, userId));
            })
            .catch(error => {
                dispatch(FetchUserDataFailure(error));
            });
    };
};

const FetchDefaultState = () => {
    return {
        type: UserActions.FETCH_USER_DATA_REQUEST,
    };
};
export const FetchUserDataFailure = error => {
    return {
        type: UserActions.FETCH_USER_DATA_FAILURE,
        error,
    };
};
export const FetchUserDataSuccess = userData => {
    return {
        type: UserActions.FETCH_USER_DATA_SUCCESS,
        payload: userData,
    };
};

//Friends
export const FetchFriendsRequest = (token, userId) => {
    const requestBody = {
        token: token,
        user_id: userId,
        index: 0,
        count: 0,
    };
    return dispatch => {
        axios
            .post(BASE_URL + '/it4788/get_user_friends', requestBody)
            .then(response => {
                const responseData = response.data;
                const friends = responseData['data']['friends'];
                dispatch(FetchFriendsSuccess(friends));
            })
            .catch(error => {
                dispatch(FetchFriendsFailure(error));
            });
    };
};
export const FetchFriendsFailure = error => {
    return {
        type: UserActions.FETCH_FRIENDS_FAILURE,
        error,
    };
};
export const FetchFriendsSuccess = friends => {
    return {
        type: UserActions.FETCH_FRIENDS_SUCCESS,
        payload: friends,
    };
};
//Profie posts
export const FetchProfilePostsRequest = (token, userId) => {
    const requestBody = {
        token: token,
        user_id: userId,
        last_id: 0,
        index: 0,
        count: 0,
    };
    return dispatch => {
        axios
            .post(BASE_URL + '/it4788/get_list_posts', requestBody)
            .then(response => {
                const responseData = response.data;
                const posts = responseData['posts'];
                dispatch(FetchProfilePostsSuccess(posts));
            })
            .catch(error => {
                dispatch(FetchProfilePostsFailure(error));
            });
    };
};
export const FetchProfilePostsFailure = error => {
    return {
        type: UserActions.FETCH_PROFILE_POSTS_FAILURE,
        error,
    };
};
export const FetchProfilePostsSuccess = posts => {
    return {
        type: UserActions.FETCH_PROFILE_POSTS_SUCCESS,
        payload: posts,
    };
};
