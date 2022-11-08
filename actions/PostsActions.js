import {PostsActions} from '../constants';
import axios from 'axios';

export const FetchPostsRequest = jwtToken => {
    const taskURI = `${jwtToken}`;
    return dispatch => {
        dispatch(FetchDefaultState());
        axios
            .get(taskURI)
            .then(v => {
                const posts = v.data;
                dispatch(FetchPostsSuccess(posts));
            })
            .catch(error => {
                dispatch(FetchPostsFailure(error));
            });
    };
};
const FetchDefaultState = () => {
    return {
        type: PostsActions.FETCH_POSTS_REQUEST,
    };
};
export const FetchPostsFailure = error => {
    return {
        type: PostsActions.FETCH_POSTS_FAILURE,
        error,
    };
};
export const FetchPostsSuccess = posts => {
    return {
        type: PostsActions.FETCH_POSTS_SUCCESS,
        payload: posts,
    };
};
