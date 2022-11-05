import {UserActions} from '../constants';
import axios from 'axios';
export const FetchUserData = jwtToken => {
    const taskURI = `${jwtToken}`;
    return dispatch => {
        dispatch(FetchDefaultState());
        axios
            .get(taskURI)
            .then(v => {
                const userData = v.data;
                dispatch(FetchUserDataSuccess(userData));
                dispatch(FetchFriendsRequest(jwtToken));
                dispatch(FetchProfilePostsRequest(jwtToken));
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
export const FetchFriendsRequest = jwtToken => {
    const taskURI = `${jwtToken}`;
    return dispatch => {
        axios
            .get(taskURI)
            .then(v => {
                const friends = v.data;
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
export const FetchProfilePostsRequest = jwtToken => {
    const taskURI = `${jwtToken}`;
    return dispatch => {
        axios
            .get(taskURI)
            .then(v => {
                const posts = v.data;
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
