import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {SCREEN_WIDTH} from '../../../core/Constants';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AvatarOptions from '../userprofilescreens/AvatarOptions';
import BackgroundOptions from './BackgroundOptions';
import FriendsShowing from '../../../components/FriendsShowing';
import PostTool from '../../../components/PostTool';
import ProfilePosts from '../../../components/ProfilePosts';
import * as navigation from '../../../core/Navigation';
import {Routes} from '../../../core/Routes';
import {useSelector} from 'react-redux';
import {userSelectors} from '../../../core/slice/User';
import {appSelectors} from '../../../core/slice/App';
import {postSelectors} from '../../../core/slice/Post';
import {useAsync} from 'react-use';
import PostItem from '../../../components/PostItem';
import axios from 'axios';
import {LogicCode} from '../../../core/Constants';
import {BASE_URL} from '../../../core/Constants';

const UserProfileScreen = () => {
    const [posts, setPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const statusContent = useSelector(postSelectors.getStatusContent);
    const token = useSelector(appSelectors.getToken);
    const userId = useSelector(appSelectors.getUserId);

    const state = useAsync(async () => {
        const requestBody = {
            token: token,
            user_id: userId,
            index: currentIndex,
            count: 10,
        };
        const response = await axios.post(BASE_URL + '/it4788/get_list_posts', requestBody);
        if (response.data.code == LogicCode.SUCCESS) {
            var listPosts = response.data.data.posts.filter(
                x => posts.filter(y => y.id == x.id).length == 0,
            );
            setPosts([...posts, ...listPosts]);
            setIsReload(false);
            setIsLoadMore(false);
        }
    }, [refresh, currentIndex, token, userId]);

    const [isReload, setIsReload] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);

    const handleReload = () => {
        if (!isReload && !isLoadMore) {
            setIsReload(true);
            setCurrentIndex(0);
            setRefresh(!refresh);
        }
    };

    const handleLoadMore = () => {
        if (!isLoadMore && !isReload) {
            setIsLoadMore(true);
            setCurrentIndex(currentIndex + 1);
        }
    };

    const [isVisibleAvatarOptions, setVisibleAvatarOptions] = useState(false);
    const [isVisibleBackgroundOptions, setVisibleBackgroundOptions] = useState(false);

    const user = useSelector(userSelectors.getUser);

    const onPressAvatarOptionsHandler = () => {
        setVisibleAvatarOptions(true);
    };

    const onPressProfileSettingHandler = () => {
        setVisibleBackgroundOptions(true);
    };

    const onPressEditPublicInfoHandler = () => {
        navigation.navigate(Routes.EDIT_PROFILE_SCREEN);
    };

    const onPressSettingProfilePageHandler = () => {
        navigation.navigate(Routes.SETTING_PROFILE_PAGE_SCREEN);
    };

    return (
        <View>
            <FlatList
                data={posts}
                ListHeaderComponent={
                    <>
                        <View style={styles.infoWrapper}>
                            <View style={styles.avatarCoverWrapper}>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Image style={styles.cover} source={{uri: user.cover}} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onPressProfileSettingHandler}
                                    activeOpacity={0.8}
                                    style={styles.btnChangeCover}>
                                    <FontAwesome5Icon size={18} name="camera" />
                                </TouchableOpacity>
                                <View style={styles.avatarWrapper}>
                                    <TouchableOpacity activeOpacity={0.9}>
                                        <Image style={styles.avatar} source={{uri: user.avatar}} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={onPressAvatarOptionsHandler}
                                        style={styles.btnChangeAvatar}>
                                        <FontAwesome5Icon size={18} name="camera" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.introWrapper}>
                                <Text style={styles.name}>{user.username}</Text>
                                <Text style={styles.introTxt}>{user.description}</Text>
                                <View style={styles.introOptionsWrapper}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.btnAddStory}>
                                        <FontAwesome5Icon
                                            size={16}
                                            color="#fff"
                                            name="plus-circle"
                                        />
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: '500',
                                                color: '#fff',
                                                marginLeft: 5,
                                            }}>
                                            Add to your story
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={onPressSettingProfilePageHandler}
                                        activeOpacity={0.8}
                                        style={styles.btnOption}>
                                        <FontAwesome5Icon
                                            size={20}
                                            color="#000"
                                            name="ellipsis-h"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {user.address && (
                                <>
                                    <View style={styles.introListWrapper}>
                                        <View style={styles.introLine}>
                                            <FontAwesome5Icon
                                                size={20}
                                                color="#333"
                                                style={styles.introIcon}
                                                name="home"
                                            />
                                            <Text style={styles.introLineText}>
                                                Live in{' '}
                                                <Text style={styles.introHightLight}>
                                                    {user.address}
                                                </Text>
                                            </Text>
                                        </View>
                                    </View>
                                </>
                            )}
                            <View
                                style={{
                                    paddingVertical: 20,
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: '#ddd',
                                }}>
                                <TouchableOpacity
                                    onPress={onPressEditPublicInfoHandler}
                                    activeOpacity={0.8}
                                    style={styles.btnEditPublicDetail}>
                                    <Text
                                        style={{color: '#318bfb', fontSize: 16, fontWeight: '500'}}>
                                        Edit public info
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <FriendsShowing userId={userId} />
                        </View>
                        <PostTool />
                    </>
                }
                ListEmptyComponent={<View />}
                ListFooterComponent={() => isLoadMore && <ActivityIndicator size="large" />}
                onRefresh={handleReload}
                refreshing={isReload}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                renderItem={({item, index}) => {
                    return (
                        <PostItem
                            key={item.id}
                            index={index}
                            item={item}
                            user={user}
                            statusContent={statusContent}
                        />
                    );
                }}></FlatList>
            <AvatarOptions
                isVisible={isVisibleAvatarOptions}
                closeModal={() => setVisibleAvatarOptions(false)}
            />
            <BackgroundOptions
                isVisible={isVisibleBackgroundOptions}
                closeModal={() => setVisibleBackgroundOptions(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    infoWrapper: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    avatarCoverWrapper: {
        paddingBottom: 90,
        position: 'relative',
    },
    cover: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    avatarWrapper: {
        backgroundColor: '#000',
        position: 'absolute',
        borderRadius: 2000,
        left: (SCREEN_WIDTH - 30 - 180) / 2, //paddingHorizontal - avatarWidth
        bottom: 0,
    },
    avatar: {
        height: 180,
        width: 180,
        borderRadius: 2000,
        borderColor: '#fff',
        borderWidth: 5,
    },
    btnChangeCover: {
        backgroundColor: '#fff',
        position: 'absolute',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 2.5,
        bottom: 90 + 10,
        right: 10,
    },
    btnChangeAvatar: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 50,
        width: 45,
        height: 45,
        borderWidth: 2.5,
        borderColor: '#fff',
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    introWrapper: {
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5,
    },
    name: {
        fontSize: 24,
        fontWeight: '500',
        color: '#000',
    },
    subName: {
        fontSize: 20,
        fontWeight: '500',
    },
    introTxt: {
        color: 'rgba(0,0,0,0.7)',
        marginTop: 10,
    },
    introOptionsWrapper: {
        marginTop: 15,
        flexDirection: 'row',
    },
    btnAddStory: {
        backgroundColor: '#318bfb',
        borderRadius: 5,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH - 30 - 50 - 10, //paddingHorizontal optionBtnWidth, marginLeft
    },
    btnOption: {
        marginLeft: 10,
        borderRadius: 5,
        height: 40,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
    },
    introListWrapper: {
        paddingVertical: 10,
    },
    introLine: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    introIcon: {
        width: 30,
    },
    introLineText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
    },
    introHightLight: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    highlightPhotosWrapper: {
        flexDirection: 'row',
        borderRadius: 10,
        flexWrap: 'wrap',
        overflow: 'hidden',
        justifyContent: 'space-between',
    },
    highLightPhoto: {},
    photo: {
        width: (SCREEN_WIDTH - 42) / 3,
        height: (SCREEN_WIDTH - 42) / 3,
    },
    btnEditPublicDetail: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9dd0eb',
        width: '100%',
        height: 40,
        borderRadius: 5,
    },
    friendsWrapper: {
        paddingVertical: 15,
    },
    friendsBar: {
        borderRadius: 5,
        paddingVertical: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnFindFriends: {
        paddingHorizontal: 10,
    },
    friendGallery: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    friendItem: {
        width: (SCREEN_WIDTH - 30 - 20) / 3,
        marginBottom: 15,
    },
    friendAvatar: {
        width: (SCREEN_WIDTH - 30 - 20) / 3,
        height: (SCREEN_WIDTH - 30 - 20) / 3,
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: '#333',
    },
    btnViewAllFriends: {
        width: '100%',
        borderRadius: 5,
        height: 40,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigationsWrapper: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 15,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        height: 100,
        width: SCREEN_WIDTH,
        paddingHorizontal: 10,
    },
    navigation: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#ddd',
        borderRadius: 48,
        marginHorizontal: 5,
    },
    lastNavigation: {
        marginRight: 25,
    },
    navigationIcon: {
        width: 30,
        alignItems: 'center',
    },
});

export default UserProfileScreen;
