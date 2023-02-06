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

import {postOperations, postSelectors} from '../../../core/slice/Post';
import ScaledImage from '../../../components/ScaledImage';
import PostTool from '../../../components/PostTool';

import {Routes} from '../../../core/Routes';
import {navigation} from '../../../core/Navigation';
import {userSelectors} from '../../../core/slice/User';
import Loader from '../../../components/Loader';

const Item = ({index, item, user, statusContent}) => {
    // console.log(item);
    const [isLiked, setIsLiked] = useState(item.is_liked);
    const [like, setLike] = useState(item.like);

    const dispatch = useDispatch();
    const onPressHandle = () => {
        const {comments} = item;
        navigation.navigate('Comments', {
            comments,
        });
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

    return (
        <View style={stylesForItem.item}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={stylesForItem.customListView}>
                    <Image style={stylesForItem.avatar} source={{uri: item.author?.avatar}}></Image>
                    <View style={stylesForItem.infoWrapper}>
                        <View style={stylesForItem.namesWrapper}>
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
                        <View style={stylesForItem.extraInfoWrapper}>
                            <Text style={{color: '#333', fontSize: 14}}>{item.created}</Text>
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
            <View style={stylesForItem.contentContainer}>
                <Text style={stylesForItem.paragraph}>{item.content}</Text>
            </View>
            <TouchableOpacity onPress={onPressPostImageHandler.bind(this, item.id)}>
                {item.image.length ? (
                    <View style={stylesForItem.imageContainer}>
                        <ScaledImage height={300} source={item.image[0]}></ScaledImage>
                    </View>
                ) : (
                    <View></View>
                )}
            </TouchableOpacity>
            <View horizontal={true} style={stylesForItem.reactionContainer}>
                <TouchableOpacity onPress={onReactPressHandler}>
                    <FontAwesome5Icon
                        name="thumbs-up"
                        // color="#318bfb"
                        color={isLiked ? '#318bfb' : '#999999'}
                        backgroundColor="#fff"
                        style={stylesForItem.reactionIcon}>
                        <Text style={{fontSize: 14}}> {like} likes</Text>
                    </FontAwesome5Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressHandle.bind(this)}>
                    <FontAwesome5Icon
                        lineBreakMode={false}
                        name="comment-alt"
                        color="gray"
                        backgroundColor="white"
                        style={{...stylesForItem.reactionIcon, fontSize: 14}}>
                        <Text style={{fontSize: 14}}> {item.comment} comments</Text>
                    </FontAwesome5Icon>
                </TouchableOpacity>
            </View>
            <View style={stylesForItem.commentContainer}>
                <Image source={{uri: user.avatar}} style={stylesForItem.commentAvatar}></Image>
                <View style={stylesForItem.commentInput}>
                    <TouchableOpacity
                        onPress={onPressHandle.bind(this)}
                        style={stylesForItem.commentInputWrapper}>
                        <Text>Comment...</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Icon
                        style={stylesForItem.btnSendComment}
                        name="paper-plane"
                        color="gray"></Icon>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const HomeScreen = () => {
    const posts = useSelector(postSelectors.getPost);
    const user = useSelector(userSelectors.getUser);
    const statusContent = useSelector(postSelectors.getStatusContent);
    const dispatch = useDispatch();

    const [isReload, setIsReload] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const handleReload = () => {
        setIsReload(true);
        dispatch(postOperations.fetchGetListPosts({reloadFlag: true})).then(() => {
            setIsReload(false);
        });
    };
    const handleLoadMore = () => {
        if (!isLoadMore) {
            setIsLoadMore(true);
            dispatch(postOperations.fetchGetListPosts({})).then(() => {
                setIsLoadMore(false);
            });
        }
    };

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    };

    return (
        <View>
            <ScrollView
                bounces={false}
                style={styles.listContainter}
                refreshControl={<RefreshControl refreshing={isReload} onRefresh={handleReload} />}
                onMomentumScrollEnd={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        handleLoadMore();
                    }
                }}
                scrollEventThrottle={400}>
                <PostTool userAvatar={user.avatar}></PostTool>
                {posts.map((item, index) => (
                    <View key={index}>
                        <Item
                            index={index}
                            item={item}
                            key={index}
                            user={user}
                            statusContent={statusContent}></Item>
                    </View>
                ))}
                <View visible={isLoadMore}>
                    <ActivityIndicator
                        animating={isLoadMore}
                        color="#000000"
                        size="large"
                        style={styles.activityIndicator}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const stylesForItem = StyleSheet.create({
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    countTxt: {
        fontSize: 200,
        textAlign: 'center',
        lineHeight: screenHeight - 170,
        width: '100%',
        height: screenHeight - 170,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: 'black',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        lineHeight: 50,
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});
