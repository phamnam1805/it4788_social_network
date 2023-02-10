import React, {useState} from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

import {navigation} from '../core/Navigation';
import {postOperations} from '../core/slice/Post';
import ScaledImage from './ScaledImage';
import {Routes} from '../core/Routes';
import {commentOperations} from '../core/slice/Comment';

const PostItem = ({index, item, user, statusContent}) => {
    // console.log(item);
    const [isLiked, setIsLiked] = useState(item.is_liked);
    const [like, setLike] = useState(item.like);

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

    const onPressPostOptionsIconHandler = () => {
        navigation.navigate('PostOptions', {
            postDetail: item,
        });
    };
    const onPressPostImageHandler = id => {
        navigation.navigate('PostDetail', {
            id,
        });
    };
    const onPressProfileHandler = userId => {
        if (userId === user.id) {
            return navigation.navigate('Profile');
        }
        navigation.push('ProfileX', {
            userId,
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

    return (
        <View style={styles.item}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.customListView}>
                    <Image style={styles.avatar} source={{uri: item.author?.avatar}}></Image>
                    <View style={styles.infoWrapper}>
                        <View style={styles.namesWrapper}>
                            <TouchableOpacity
                                onPress={onPressProfileHandler.bind(this, item.author?.id)}>
                                <Text style={{fontSize: 16, fontWeight: '500'}}>
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
                        <View style={styles.extraInfoWrapper}>
                            <Text style={{color: '#333', fontSize: 14}}>
                                {convertTime(item.created)}
                            </Text>
                            <Text style={{fontSize: 16, marginHorizontal: 5}}>·</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={onPressPostOptionsIconHandler.bind(this)}
                    style={{width: 25, alignItems: 'center'}}>
                    <Icon name="ellipsis-h" color="#000"></Icon>
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.paragraph}>{item.content}</Text>
            </View>
            <TouchableOpacity onPress={onPressPostImageHandler.bind(this, item.id)}>
                {item.image.length ? (
                    <View style={styles.imageContainer}>
                        <ScaledImage height={300} source={item.image[0]}></ScaledImage>
                    </View>
                ) : (
                    <View></View>
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
                    <Icon style={styles.btnSendComment} name="paper-plane" color="gray"></Icon>
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
    paragraph: {},
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
