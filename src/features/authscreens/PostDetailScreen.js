/* eslint-disable react-hooks/exhaustive-deps */
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
import Swiper from 'react-native-swiper';
import {postApi, postSelectors} from '../../core/slice/Post';
import {appSelectors} from '../../core/slice/App';
import PostItem from '../../components/PostItem';
import {userSelectors} from '../../core/slice/User';
import {navigation} from '../../core/Navigation';
import {Routes} from '../../core/Routes';
import {commentOperations} from '../../core/slice/Comment';
import {postOperations} from '../../core/slice/Post';
import ScaledImage from '../../components/ScaledImage';

const PostDetailScreen = ({route}) => {
    const {postIndex} = route.params || {};
    const post = useSelector(state => postSelectors.getPost(state, postIndex));
    const [isLiked, setIsLiked] = useState(post.is_liked);
    const [like, setLike] = useState(post.like);
    const dispatch = useDispatch();

    const user = useSelector(userSelectors.getUser);
    const statusContent = useSelector(postSelectors.getStatusContent);
    const userId = useSelector(appSelectors.getUserId);
    const optionDisplay = userId === post.author.id ? 'flex' : 'none';

    useEffect(() => {
        setIsLiked(post.is_liked);
        setLike(post.like);
    }, [post.is_liked, post.like]);

    const onReactPressHandler = async () => {
        dispatch(postOperations.fetchLikePost({index: postIndex}));
        if (isLiked) {
            setLike(like - 1);
        } else {
            setLike(like + 1);
        }
        setIsLiked(!isLiked);
    };

    const onPressGoBackHandler = () => {
        navigation.goBack();
    };

    const onDeletePostPressHandler = () => {
        dispatch(postOperations.fetchDeletePost({index: postIndex}));
        navigation.navigate(Routes.HOME_SCREEN);
    };
    const onCommentPressHandler = () => {
        dispatch(commentOperations.fetchGetListComments({postId: post.id, reloadFlag: true}));
        navigation.navigate(Routes.COMMENT_SCREEN, {postId: post.id, postIndex: postIndex});
    };

    const onPressProfileHandler = userId => {
        if (userId === user.id) {
            return navigation.navigate('Profile');
        }
        navigation.navigate(Routes.OTHER_PROFILE_SCREEN, {
            userId: userId,
        });
    };

    const onImagePressHandler = index => {
        navigation.navigate(Routes.IMAGE_VIEW_SCREEN, {
            imageIndex: index,
            post: post,
        });
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
                <AntDesignIcon name="edit" size={16} color="#000">
                    {' Edit this post'}
                </AntDesignIcon>
            </Menu.Item>
            <Menu.Item onPress={() => onDeletePostPressHandler()}>
                <AntDesignIcon name="delete" size={16} color="#000">
                    {' Delete this post'}
                </AntDesignIcon>
            </Menu.Item>
        </Menu>
    );
    return (
        <View style={{...styles.wrapper}}>
            <View style={styles.navigationStackBar}>
                <TouchableOpacity onPress={onPressGoBackHandler} style={styles.btnBack}>
                    <FontAwesome5Icon name="arrow-left" size={24} color="#000"></FontAwesome5Icon>
                </TouchableOpacity>
                <View style={styles.stackBarTitle}>
                    <Text style={{fontSize: 18, color: '#000', fontWeight: '#800'}}>
                        {post.author.username + "'s post"}
                    </Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.post}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.customListView}>
                            <TouchableOpacity
                                onPress={onPressProfileHandler.bind(this, post.author?.id)}>
                                <Image
                                    style={styles.avatar}
                                    source={{uri: post.author?.avatar}}></Image>
                            </TouchableOpacity>
                            <View style={styles.infoWrapper}>
                                <View style={styles.namesWrapper}>
                                    <TouchableOpacity
                                        onPress={onPressProfileHandler.bind(this, post.author?.id)}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: '800',
                                                color: '#000',
                                            }}>
                                            {post.author?.username}
                                        </Text>
                                    </TouchableOpacity>
                                    {post.status ? (
                                        <>
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: '500',
                                                    color: '#000',
                                                }}>
                                                {' is ' + statusContent[post.status]}
                                            </Text>
                                            <MaterialCommunityIcon
                                                size={35}
                                                name={post.status}
                                                // style={styles.optionImage}
                                                color="#bd9cf1"
                                            />
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </View>
                                <View style={styles.extraInfoWrapper}>
                                    <Text style={{color: '#333', fontSize: 14}}>
                                        {convertTime(post.created)}
                                    </Text>
                                    <Text style={{fontSize: 16, marginHorizontal: 5}}>·</Text>
                                </View>
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
                            <Text style={styles.paragraph}>{post.content}</Text>
                        </Hyperlink>
                    </View>
                    {post.image.length ? (
                        <View>
                            {post.image.map((imageItem, imageIndex) => (
                                <View key={imageIndex} style={styles.imageContainer}>
                                    <TouchableOpacity
                                        onPress={() => onImagePressHandler(imageIndex)}>
                                        <ScaledImage
                                            width={screenWidth - 20}
                                            source={imageItem}></ScaledImage>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <></>
                    )}
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
                                <Text style={{fontSize: 14}}> {post.comment} comments</Text>
                            </FontAwesome5Icon>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default PostDetailScreen;

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '100%',
    },
    navigationStackBar: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    stackBarTitle: {
        position: 'absolute',
        width: screenWidth,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: 40,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    btnBack: {
        zIndex: 99,
    },
    post: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: {height: 0, width: 0},
        marginBottom: 10,
    },
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
    paragraph: {
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
    },
    contentContainer: {
        paddingHorizontal: 15,
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
    imageContainer: {
        marginTop: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
