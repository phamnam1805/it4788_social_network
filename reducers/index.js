import {combineReducers} from 'redux';
import postsReducer from './PostsReducer';
import userReducer from './UserReducer';
const rootReducer = combineReducers({
    user: userReducer,
    posts: postsReducer,
});
export default rootReducer;
