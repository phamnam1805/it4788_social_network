import {PostDetailActions} from '../constants';
import axios from 'axios';
export const FetchPostDetailRequest = (postId, isShowModal) => {
    const taskURI = `${postId}?`;
    return dispatch => {
        axios
            .get(taskURI)
            .then(result => {
                const showingPost = {
                    postDetail: result.data,
                    isShowModal,
                    isShowCommentModal: false,
                };
                dispatch(FetchPostDetailSuccess(showingPost));
            })
            .catch(error => {
                dispatch(FetchPostDetailFailure(error));
            });
    };
};
export const ClosePostDetailModal = () => {
    return {
        type: PostDetailActions.CLOSE_POST_DETAIL_MODAL,
    };
};
export const OpenCommentModal = () => {
    return {
        type: PostDetailActions.OPEN_COMMENTS_MODAL,
    };
};
export const CloseCommentModal = () => {
    return {
        type: PostDetailActions.CLOSE_COMMENTS_MODAL,
    };
};
const FetchDefaultState = () => {
    return {
        type: PostDetailActions.FETCH_POST_DETAIL_REQUEST,
    };
};
export const FetchPostDetailFailure = error => {
    return {
        type: PostDetailActions.FETCH_POST_DETAIL_FAILURE,
        error,
    };
};
export const FetchPostDetailSuccess = showingPost => {
    return {
        type: PostDetailActions.FETCH_POST_DETAIL_SUCCESS,
        payload: showingPost,
    };
};
