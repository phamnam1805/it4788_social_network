import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useMemo, useState } from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../../../core/Navigation'
import { useSelector } from 'react-redux';
import { Routes } from '../core/Routes';
import { useAsync } from 'react-use';
import { userApi } from '../core/slice/User';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL, LogicCode } from '../../../core/Constants';
import { userSelectors } from '../../../core/slice/User';
import { appSelectors } from '../../../core/slice/App';
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
import FriendOptions from './FriendsOptions';

const AllFriendsScreen = ({ route }) => {

    const [openModal, setOpenModal] = useState(openModal);
    const [currentSelectFriend, setCurrenSelectFriend] = useState(null);

    const { userId } = route.params;
    const token = useSelector(appSelectors.getToken);
    const goBack = () => {
        navigation.goBack();
    }

    const allFriends = useAsync(async () => {
        var res = await axios.post(BASE_URL + "/it4788/get_user_friends",
            {
                token: token,
                count: 0,
                user_id: userId
            });

        if (res.data.code == LogicCode.SUCCESS) {
            return res.data.data.friends
        }
        return null;
    }, [token, userId])

    const selectFriend = friend => {
        setCurrenSelectFriend(friend);
        setOpenModal(true);
    }

    return (<>
        <View style={styles.container}>
            <View style={styles.navigationBar}>
                <ExTouchableOpacity onPress={goBack} style={styles.btnBack}>
                    <FontAwesome5Icon name="arrow-left" size={20} />
                </ExTouchableOpacity>
                <Text style={styles.titleText}>Friends</Text>
            </View>
            <ScrollView>
                {allFriends.value && allFriends.value.map((friend, index) => (
                    <View style={styles.item} key={index}>

                        <View style={styles.itemLeft}>
                            <Image style={styles.itemImage} source={{ uri: friend.avatar_image }} />
                            <Text style={styles.itemName}>{friend.username}</Text>

                        </View>
                        <ExTouchableOpacity onPress={() => selectFriend(friend)}>
                            <FontAwesome5Icon size={20} color="#000" name="ellipsis-h" />
                        </ExTouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            {openModal && <FriendOptions isVisible={openModal} closeModal={() => setOpenModal(false)} friend={currentSelectFriend}  />}
        </View>
    </>)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    navigationBar: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    titleText: {
        fontWeight: 700,
        fontSize: 20
    },
    btnBack: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderBottomColor: "rgba(0,0,0,0.1)",
        borderBottomWidth: 2
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemImage: {
        width: 45,
        height: 45,
        marginRight: 20,
        borderRadius: 100
    },
    itemName: {
        fontSize: 16,
        fontWeight: 500
    }
});


export default AllFriendsScreen;