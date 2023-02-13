import React, {useEffect, useState} from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    RefreshControl,
    FlatList,
    ActivityIndicator,
    Linking,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Menu, Pressable, Box} from 'native-base';
import Hyperlink from 'react-native-hyperlink';

import {navigation} from '../core/Navigation';
import {postOperations, postSelectors} from '../core/slice/Post';
import ScaledImage from './ScaledImage';
import {Routes} from '../core/Routes';
import {commentOperations} from '../core/slice/Comment';
import VideoPlayer from './VideoPlayer';
import Swiper from 'react-native-swiper';
import {appSelectors} from '../core/slice/App';

const PostItem = ({item, index, user, statusContent}) => {
    const [isLiked, setIsLiked] = useState(item.is_liked);
    const [like, setLike] = useState(item.like);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const userId = useSelector(appSelectors.getUserId);
    const optionDisplay = userId === item.author.id ? 'flex' : 'none';

    useEffect(() => {
        setIsLiked(item.is_liked);
        setLike(item.like);
    }, [item.is_liked, item.like]);

    // useEffect(() => {}, [item.like]);

    const dispatch = useDispatch();
    const onCommentPressHandler = () => {
        dispatch(commentOperations.fetchGetListComments({postId: item.id, reloadFlag: true}));
        navigation.navigate(Routes.COMMENT_SCREEN, {postId: item.id, postIndex: index});
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

    const onImagePressHandler = () => {
        navigation.navigate(Routes.IMAGE_VIEW_SCREEN, {
            imageIndex: currentImageIndex,
            post: item,
        });
    };

    const onDeletePostPressHandler = () => {
        dispatch(postOperations.fetchDeletePost({index}));
    };

    const onPressProfileHandler = inputUserId => {
        if (userId === inputUserId) {
            return navigation.navigate(Routes.USER_PROFILE_SCREEN);
        }
        navigation.navigate(Routes.OTHER_PROFILE_SCREEN, {
            userId: inputUserId
        });
    };

    const onTimePressHandler = () => {
        navigation.navigate(Routes.POST_DETAIL_SCREEN, {postIndex: index});
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

    const postActions = (
        <Menu
            // bg={}
            width={'100%'}
            trigger={triggerProps => {
                return (
                    <Pressable
                        p={2}
                        {...triggerProps}
                        _pressed={{
                            opacity: 0.2,
                        }}>
                        <FontAwesome5Icon name="ellipsis-h" color="#000" />
                    </Pressable>
                );
            }}>
            <Menu.Item onPress={() => console.log('1')}>
                <AntDesignIcon name="edit" size={16}>
                    {' Edit this post'}
                </AntDesignIcon>
            </Menu.Item>
            <Menu.Item onPress={() => onDeletePostPressHandler()}>
                <AntDesignIcon name="delete" size={16}>
                    {' Delete this post'}
                </AntDesignIcon>
            </Menu.Item>
        </Menu>
    );

    return (
        <View style={styles.item}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.customListView}>
                    <TouchableOpacity onPress={onPressProfileHandler.bind(this, item.author?.id)}>
                        <Image style={styles.avatar} source={{uri: item.author?.avatar}}></Image>
                    </TouchableOpacity>
                    <View style={styles.infoWrapper}>
                        <View style={styles.namesWrapper}>
                            <TouchableOpacity
                                onPress={onPressProfileHandler.bind(this, item.author?.id)}>
                                <Text style={{fontSize: 16, fontWeight: '800'}}>
                                    {item.author?.username}
                                </Text>
                            </TouchableOpacity>
                            {item.status ? (
                                <>
                                    <Text style={{fontSize: 16, fontWeight: '500'}}>
                                        {' is ' + statusContent[item.status]}
                                    </Text>
                                    <MaterialCommunityIcon
                                        size={35}
                                        name={item.status}
                                        // style={styles.optionImage}
                                        color="#bd9cf1"
                                    />
                                </>
                            ) : (
                                <></>
                            )}
                        </View>
                        <TouchableOpacity onPress={onTimePressHandler}>
                            <View style={styles.extraInfoWrapper}>
                                <Text style={{color: '#333', fontSize: 14}}>
                                    {convertTime(item.created)}
                                </Text>
                                <Text style={{fontSize: 16, marginHorizontal: 5}}>·</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{display: optionDisplay, top: 10, right: 10}}>
                    <Box>{postActions}</Box>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Hyperlink
                    onPress={(url, text) => Linking.openURL(url)}
                    linkStyle={{color: '#2980b9'}}>
                    <Text style={styles.paragraph}>{item.content}</Text>
                </Hyperlink>
            </View>
            <TouchableOpacity onPress={onImagePressHandler}>
                {item.image.length ? (
                    <Swiper
                        height={300}
                        showsButtons={item.image.length > 1 ? true : false}
                        scrollEnabled={false}
                        onIndexChanged={index => setCurrentImageIndex(index)}>
                        {item.image.map((imageItem, index) => (
                            <View key={index} style={styles.imageContainer}>
                                <ScaledImage height={300} source={imageItem}></ScaledImage>
                            </View>
                        ))}
                    </Swiper>
                ) : (
                    <></>
                )}
            </TouchableOpacity>
            <View horizontal={true} style={styles.reactionContainer}>
                <TouchableOpacity onPress={onReactPressHandler}>
                    <FontAwesome5Icon
                        name="thumbs-up"
                        // color="#318bfb"
                        color={isLiked ? '#318bfb' : '#999999'}
                        backgroundColor="#fff"
                        style={styles.reactionIcon}>
                        {isLiked ? (
                            <Text style={{fontSize: 14}}>
                                {'You' + (like > 1 ? ' and ' + (like - 1) + ' others' : '')}
                            </Text>
                        ) : (
                            <Text style={{fontSize: 14}}> {like} </Text>
                        )}
                    </FontAwesome5Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={onCommentPressHandler.bind(this)}>
                    <FontAwesome5Icon
                        lineBreakMode={false}
                        name="comment-alt"
                        color="gray"
                        backgroundColor="white"
                        style={{...styles.reactionIcon, fontSize: 14}}>
                        <Text style={{fontSize: 14}}> {item.comment} comments</Text>
                    </FontAwesome5Icon>
                </TouchableOpacity>
            </View>
            <View style={styles.commentContainer}>
                <Image source={{uri: user.avatar}} style={styles.commentAvatar}></Image>
                <View style={styles.commentInput}>
                    <TouchableOpacity
                        onPress={onCommentPressHandler.bind(this)}
                        style={styles.commentInputWrapper}>
                        <Text>Comment...</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <FontAwesome5Icon
                        style={styles.btnSendComment}
                        name="paper-plane"
                        color="gray"></FontAwesome5Icon>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PostItem;

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    customListView: {
        padding: 15,
        width: screenWidth - 40,
        flexDirection: 'row',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    infoWrapper: {
        marginLeft: 8,
    },
    namesWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    extraInfoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: {height: 0, width: 0},
        marginBottom: 10,
    },
    commentInputWrapper: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        borderRadius: 20,
        paddingHorizontal: 15,
    },
    paragraph: {
        fontSize: 16,
    },
    contentContainer: {
        paddingHorizontal: 15,
    },
    imageContainer: {
        marginTop: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reactionContainer: {
        position: 'relative',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    reactionIcon: {
        fontSize: 25,
        padding: 12,
    },
    shareIcon: {
        position: 'absolute',
        fontSize: 14,
        padding: 10,
        right: 0,
    },
    commentContainer: {
        flexDirection: 'row',
        padding: 10,
        borderColor: 'red',
        borderStyle: 'dashed',
        flexWrap: 'nowrap',
    },
    commentAvatar: {
        width: 30,
        height: 30,
        borderRadius: 50,
    },
    commentInput: {
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 20,
        marginLeft: 10,
        height: 30,
        width: screenWidth - 15 * 2 - 60,
    },
    btnSendComment: {
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 30,
    },
});
