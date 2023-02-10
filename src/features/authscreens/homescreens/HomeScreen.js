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
import {TextInput} from 'react-native-gesture-handler';
import PostItem from '../../../components/PostItem';
import PostList from '../../../components/PostList';

const HomeScreen = () => {
    const posts = useSelector(postSelectors.getAllPosts);
    const user = useSelector(userSelectors.getUser);
    const statusContent = useSelector(postSelectors.getStatusContent);

    const dispatch = useDispatch();

    const [isReload, setIsReload] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);

    const handleReload = () => {
        if (!isReload && !isLoadMore) {
            setIsReload(true);
            dispatch(postOperations.fetchGetListPosts({reloadFlag: true})).then(() => {
                setIsReload(false);
            });
        }
    };

    const handleLoadMore = () => {
        if (!isLoadMore && !isReload) {
            setIsLoadMore(true);
            dispatch(postOperations.fetchGetListPosts({})).then(() => {
                setTimeout(() => setIsLoadMore(false), 2000);
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
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        handleLoadMore();
                    }
                }}
                scrollEventThrottle={400}>
                <PostTool userAvatar={user.avatar}></PostTool>
                <PostList posts={posts} user={user} statusContent={statusContent} />
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
