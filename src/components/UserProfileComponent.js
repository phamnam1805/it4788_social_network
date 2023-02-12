import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useMemo, useState } from 'react';
import { LogicCode, SCREEN_WIDTH } from '../core/Constants';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FriendsShowing from './FriendsShowing';
import PostTool from './PostTool';
import ProfilePosts from './ProfilePosts';
import * as navigation from '../core/Navigation'
import { useSelector } from 'react-redux';
import { userSelectors, userOperations } from '../core/slice/User';
import { Routes } from '../core/Routes';
import { useAsync } from 'react-use';
import { userApi } from '../core/slice/User';
import { useDispatch } from 'react-redux';
import { appSelectors } from '../core/slice/App';
import axios from 'axios';
import { BASE_URL } from '../core/Constants';
import * as uuid from 'react-native-uuid'


const UserProfileComponent = ({ userId }) => {

    const token = useSelector(appSelectors.getToken);
    const user = useSelector(userSelectors.getUser);
    const [refreshRequestedFriends, setRefreshRequestedFriends] = useState(false);

    const sendRequestFriend = async () => {
        const res = await axios.post(BASE_URL + '/it4788/set_request_friend', {token: token, user_id: userId});
        if(res.data.code == LogicCode.SUCCESS){
            setRefreshRequestedFriends(!refreshRequestedFriends)
        }
    }

    const otherUserProfile = useAsync(async () => {
        const res = await axios.post(BASE_URL + '/it4788/get_user_info', { token: token, user_id: userId });
        if (res.data.code == LogicCode.SUCCESS) {
            console.error(res.data.data);
            return res.data.data;
        }
        return null;
    }, [userId, token, refreshRequestedFriends]);

    return (<>
        <View>
            {otherUserProfile.value && (<>
                <View>
                    <ScrollView bounces={false} style={styles.container}>
                        <View style={styles.infoWrapper}>
                            <View style={styles.avatarCoverWrapper}>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Image style={styles.cover} source={{ uri: otherUserProfile.value.cover }} />
                                </TouchableOpacity>
                                <View style={styles.avatarWrapper}>
                                    <TouchableOpacity activeOpacity={0.9}>
                                        <Image style={styles.avatar} source={{ uri: otherUserProfile.value.avatar }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.introWrapper}>
                                <Text style={styles.name}>{otherUserProfile.value.username}</Text>
                                <Text style={styles.introTxt}>{otherUserProfile.value.description}</Text>
                                <View style={styles.introOptionsWrapper}>
                                    {
                                        otherUserProfile.value.is_friend ? (<>
                                            <TouchableOpacity activeOpacity={0.8} style={styles.btnAddFriends}>
                                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', marginLeft: 5 }}>Unfriend</Text>
                                            </TouchableOpacity>
                                        </>) : (<> 
                                            {
                                                otherUserProfile.value.is_requested ? (<>
                                                    <TouchableOpacity onPress={sendRequestFriend} activeOpacity={0.8} style={styles.btnAddFriends}>
                                                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', marginLeft: 5 }}>Cancel Request</Text>
                                                    </TouchableOpacity>
                                                </>) : (<>
                                                    {
                                                        otherUserProfile.is_received_request ? (<>
                                                            <TouchableOpacity onPress={sendRequestFriend} activeOpacity={0.8} style={styles.btnAddFriends}>
                                                                <FontAwesome5Icon size={16} color="#fff" name="plus-circle" />
                                                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', marginLeft: 5 }}>Accept Request</Text>
                                                            </TouchableOpacity>
                                                        </>) : (<>
                                                            <TouchableOpacity onPress={sendRequestFriend} activeOpacity={0.8} style={styles.btnAddFriends}>
                                                                <FontAwesome5Icon size={16} color="#fff" name="plus-circle" />
                                                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', marginLeft: 5 }}>Add friend</Text>
                                                            </TouchableOpacity>
                                                        </>)
                                                    }
                                                </>)
                                            }
                                        </>)
                                    }
                                </View>
                            </View>
                            {otherUserProfile.address && (<>
                                <View style={styles.introListWrapper}>
                                    <View style={styles.introLine}>
                                        <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="home" />
                                        <Text style={styles.introLineText}>
                                            Live in <Text style={styles.introHightLight}>{otherUserProfile.value.address}</Text>
                                        </Text>
                                    </View>
                                </View>
                            </>)}
                            <FriendsShowing />
                        </View>
                        <PostTool />
                        <ProfilePosts />
                    </ScrollView>
                </View>
            </>)}
        </View>
    </>)
}

const styles = StyleSheet.create({
    container: {

    },
    infoWrapper: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    avatarCoverWrapper: {
        paddingBottom: 90,
        position: 'relative'
    },
    cover: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    avatarWrapper: {
        backgroundColor: '#000',
        position: 'absolute',
        borderRadius: 2000,
        left: (SCREEN_WIDTH - 30 - 180) / 2, //paddingHorizontal - avatarWidth
        bottom: 0
    },
    avatar: {
        height: 180,
        width: 180,
        borderRadius: 2000,
        borderColor: '#fff',
        borderWidth: 5
    },
    btnChangeCover: {
        backgroundColor: '#fff',
        position: 'absolute',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 2.5,
        bottom: 90 + 10,
        right: 10

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
        alignItems: 'center'
    },
    introWrapper: {
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5
    },
    name: {
        fontSize: 24,
        fontWeight: '500'
    },
    subName: {
        fontSize: 20,
        fontWeight: '500'
    },
    introTxt: {
        color: 'rgba(0,0,0,0.7)',
        marginTop: 10
    },
    introOptionsWrapper: {
        marginTop: 15,
        flexDirection: 'row'
    },
    btnAddFriends: {
        backgroundColor: '#318bfb',
        borderRadius: 5,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH - 30, //paddingHorizontal optionBtnWidth, marginLeft
    },
    btnOption: {
        marginLeft: 10,
        borderRadius: 5,
        height: 40,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd'
    },
    introListWrapper: {
        paddingVertical: 10
    },
    introLine: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center'
    },
    introIcon: {
        width: 30,
    },
    introLineText: {
        fontSize: 16,
        fontWeight: '400'
    },
    introHightLight: {
        fontWeight: 'bold',
        fontSize: 16
    },
    highlightPhotosWrapper: {
        flexDirection: 'row',
        borderRadius: 10,
        flexWrap: 'wrap',
        overflow: 'hidden',
        justifyContent: 'space-between',
    },
    highLightPhoto: {
    },
    photo: {
        width: (SCREEN_WIDTH - 42) / 3,
        height: (SCREEN_WIDTH - 42) / 3
    },
    btnEditPublicDetail: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9dd0eb',
        width: '100%',
        height: 40,
        borderRadius: 5
    },
    friendsWrapper: {
        paddingVertical: 15
    },
    friendsBar: {
        borderRadius: 5,
        paddingVertical: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnFindFriends: {
        paddingHorizontal: 10
    },
    friendGallery: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    friendItem: {
        width: (SCREEN_WIDTH - 30 - 20) / 3,
        marginBottom: 15
    },
    friendAvatar: {
        width: (SCREEN_WIDTH - 30 - 20) / 3,
        height: (SCREEN_WIDTH - 30 - 20) / 3,
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: '#333'
    },
    btnViewAllFriends: {
        width: '100%',
        borderRadius: 5,
        height: 40,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
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
        paddingHorizontal: 10
    },
    navigation: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#ddd',
        borderRadius: 48,
        marginHorizontal: 5
    },
    lastNavigation: {
        marginRight: 25
    },
    navigationIcon: {
        width: 30,
        alignItems: "center"
    }
})


export default UserProfileComponent;