/* eslint-disable no-unreachable */
import {UserActions} from '../constants';
import {Alert} from 'react-native';
const defaultState = {
    userData: {},
    friends: [],
    posts: [],
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case UserActions.FETCH_USER_DATA_REQUEST:
            state = {...state, userData: {}};
            return state;
            break;
        case UserActions.FETCH_USER_DATA_SUCCESS:
            state = {...state, userData: action.payload};
            return state;
            break;
        case UserActions.FETCH_USER_DATA_FAILURE:
            const {message1} = action.error;
            Alert.alert('Error', message1);
            return state;
            break;
        case UserActions.FETCH_FRIENDS_REQUEST:
            state = {...state, friends: []};
            return state;
            break;
        case UserActions.FETCH_FRIENDS_SUCCESS:
            state = {...state, friends: [...action.payload]};
            return state;
            break;
        case UserActions.FETCH_FRIENDS_FAILURE:
            const {message2} = action.error;
            Alert.alert('Error', message2);
            return state;
            break;
        case UserActions.FETCH_PROFILE_POSTS_REQUEST:
            state = {...state, posts: []};
            return state;
            break;
        case UserActions.FETCH_PROFILE_POSTS_SUCCESS:
            state = {...state, posts: [...action.payload]};
            return state;
            break;
        case UserActions.FETCH_PROFILE_POSTS_FAILURE:
            const {message3} = action.error;
            Alert.alert('Error', message3);
            return state;
            break;
        default:
            return state;
    }
};
export default reducer;
