import {combineReducers} from 'redux';
import postsReducer from './PostsReducer';
import userReducer from './UserReducer';
import postDetailReducer from './PostDetailReducer';
const rootReducer = combineReducers({
    user: userReducer,
    posts: postsReducer,
    showingPost: postDetailReducer,
});
export default rootReducer;
