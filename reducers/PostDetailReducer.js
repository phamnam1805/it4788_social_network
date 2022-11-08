/* eslint-disable no-unreachable */
import {PostDetailActions} from '../constants';
import {Alert} from 'react-native';
const defaultState = {
    isShowModal: false,
    isShowCommentModal: false,
};
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case PostDetailActions.CLOSE_POST_DETAIL_MODAL:
            state = {...state, isShowModal: false};
            return state;
            break;
        case PostDetailActions.OPEN_COMMENTS_MODAL:
            state = {...state, isShowCommentModal: true, isShowModal: false};
            return state;
            break;
        case PostDetailActions.CLOSE_COMMENTS_MODAL:
            state = {...state, isShowModal: true, isShowCommentModal: false};
            return state;
            break;
        case PostDetailActions.FETCH_POST_DETAIL_REQUEST:
            state = defaultState;
            return state;
            break;
        case PostDetailActions.FETCH_POST_DETAIL_SUCCESS:
            state = action.payload;
            return state;
            break;
        case PostDetailActions.FETCH_POST_DETAIL_FAILURE:
            const {message} = action.error;
            Alert.alert('Error', message);
            state = defaultState;
            return state;
            break;
        default:
            return state;
    }
};
export default reducer;
