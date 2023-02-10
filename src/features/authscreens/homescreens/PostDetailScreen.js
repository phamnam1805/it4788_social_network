import React, {Component, useState} from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    Animated,
    ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
    closePostDetailModal,
    openCommentModal,
    FetchPostDetailRequest,
} from '../actions/postDetailActions';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Swiper from 'react-native-swiper';

import {navigation} from '../../../core/Navigation';
import {Routes} from '../../../core/Routes';
import {commentOperations} from '../../../core/slice/Comment';
import {postOperations, postSelectors} from '../../../core/slice/Post';

const ImageSwiper = React.memo(
    props => {
        const {image} = props;
        return (
            <Swiper showsPagination={false}>
                {image.map((imageItem, index) => (
                    <View key={index} style={styles.imageWrapper}>
                        <Image
                            style={styles.image}
                            resizeMode="contain"
                            source={{uri: imageItem}}></Image>
                    </View>
                ))}
            </Swiper>
        );
    },
    (prevProps, nextProps) => true,
);

const PostDetailScreen = ({route}) => {
    const {index} = route.params || {};
    const post = useSelector(state => postSelectors.getPost(state, index));
    const [isLiked, setIsLiked] = useState(post.is_liked);
    const [like, setLike] = useState(post.like);
    const [detailDisplay, setDetailDisplay] = useState('flex');

    const dispatch = useDispatch();

    const onCommentPressHandler = () => {
        dispatch(commentOperations.fetchGetListComments({postId: post.id, reloadFlag: true}));
        navigation.navigate(Routes.COMMENT_SCREEN, {postId: post.id, postIndex: index});
    };

    const onReactPressHandler = async () => {
        dispatch(postOperations.fetchLikePost({index: index}));
        if (isLiked) {
            setLike(like - 1);
        } else {
            setLike(like + 1);
        }
        setIsLiked(!isLiked);
    };

    const onPressHideDetailWrapperHandler = () => {
        if (detailDisplay === 'flex') {
            setDetailDisplay('none');
        } else {
            setDetailDisplay('flex');
        }
    };

    const onPressGoBackHandler = () => {
        dispatch(postOperations.fetchGetPost({postId: post.id, postIndex: index}));
        navigation.goBack();
    };

    const convertTime = time => {
        const preViousDate = new Date(time);
        const previousTimestamp = preViousDate.getTime();
        const nowTimestamp = Date.now();

        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerWeek = msPerDay * 7;
        const msPerMonth = msPerDay * 30;
        const msPerYear = msPerDay * 365;

        const elapsed = nowTimestamp - previousTimestamp;
        if (elapsed < msPerMinute) {
            return 'Just now';
        } else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        } else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        } else if (elapsed < msPerWeek) {
            return Math.round(elapsed / msPerDay) + ' days ago';
        } else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerWeek) + ' weeks ago';
        } else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' months ago';
        } else {
            return Math.round(elapsed / msPerYear) + ' years ago';
        }
    };

    return (
        <View style={styles.postWrapper}>
            {/* <Swiper showsPagination={false}>
                {post.image.map((imageItem, index) => (
                    <Image
                        onPress={onPressHideDetailWrapperHandler.bind(this)}
                        key={index}
                        style={styles.image}
                        resizeMode="contain"
                        source={{uri: imageItem}}></Image>
                ))}
            </Swiper> */}
            <ImageSwiper image={post.image} onPress={onPressHideDetailWrapperHandler} />

            <View style={{...styles.postContentWrapper, display: detailDisplay}}>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.name}>{post.author.username}</Text>
                    </TouchableOpacity>
                    <Text style={styles.content}>{post.content}</Text>
                    <Text style={styles.time}>{convertTime(post.created)}</Text>
                </View>
                <View style={styles.reactionValueWrapper}>
                    <TouchableOpacity>
                        <View style={styles.reactionNumberWrapper}>
                            <FontAwesome5Icon
                                name="thumbs-up"
                                color="#318bfb"
                                size={14}></FontAwesome5Icon>
                            <Text style={{color: '#fff', marginLeft: 5}}>{like}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{color: '#fff'}}>{post.comment} comments</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnReactionWrapper}>
                    <TouchableOpacity style={styles.btnWrapper} onPress={onReactPressHandler}>
                        <View style={styles.reactionBtn}>
                            <FontAwesome5Icon
                                name="thumbs-up"
                                color={!isLiked ? '#fff' : '#318bfb'}
                                size={20}></FontAwesome5Icon>
                            <Text style={styles.reactionBtnText}>Like</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnWrapper} onPress={onCommentPressHandler}>
                        <View style={styles.reactionBtn}>
                            <FontAwesome5Icon
                                name="comment-alt"
                                color="#fff"
                                size={20}></FontAwesome5Icon>
                            <Text style={styles.reactionBtnText}>Comment</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
    postWrapper: {
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,1)',
        height: '100%',
    },
    optionIconWrapper: {
        position: 'absolute',
        right: 30,
        top: 50,
        zIndex: 999999,
    },
    cycleWrapper: {
        padding: 10,
    },

    optionListWrapper: {
        position: 'absolute',
        left: 0,
        height: '100%',
        zIndex: 999999,
        backgroundColor: 'rgba(0,0,0,0)',
        width: '100%',
    },
    allOptionWrapper: {
        backgroundColor: '#fff',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 2,
    },
    optionBackDrop: {
        // backgroundColor: "red",
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
    },
    optionItemWrapper: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16,
    },
    postContentWrapper: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        left: 0,
        width: '100%',
        // zIndex: 99,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    name: {
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        color: '#fff',
    },
    time: {
        marginTop: 5,
        color: '#fff',
        // textTransform: 'uppercase',
        opacity: 0.5,
    },
    btnReactionWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
    },
    reactionBtnText: {
        color: '#fff',
        marginLeft: 5,
    },
    btnWrapper: {
        flex: 1,
    },
    reactionBtn: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageWrapper: {},
    image: {
        backgroundColor: 'rgba(0,0,0,0)',
        height: '100%',
    },
    reactionValueWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    reactionNumberWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
