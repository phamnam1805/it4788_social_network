import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import {useAsync} from 'react-use';
import { useState } from 'react';
import * as navigation from '../../../core/Navigation';
import axios from 'axios';
import { BASE_URL } from '../../../core/Constants';
import { appSelectors } from '../../../core/slice/App';
import { useSelector } from 'react-redux';
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { LogicCode } from '../../../core/Constants';
import { Routes } from '../../../core/Routes';

const ListFriendRequestScreen = () => {
    const [refreshRequestedFriends, setRefreshRequestedFriends] = useState(false);
    const token = useSelector(appSelectors.getToken);

    const goBack = ()=> {
        navigation.goBack();
    }

    const requests = useAsync(async() => {
        const res = await axios.post(BASE_URL + '/it4788/get_requested_friends', { token: token, count: 0 });
        if (res.data.code == LogicCode.SUCCESS) {
            return res.data.data;
        }
        return null;
    }, [token, refreshRequestedFriends])

    const redirectToUserProfile = (userId) => {
        navigation.navigate(Routes.OTHER_PROFILE_SCREEN, {userId: userId})
    }

    return (<>
        <View style={styles.container}>
            <View style={styles.navigationBar}>
                <ExTouchableOpacity onPress={goBack} style={styles.btnBack}>
                    <FontAwesome5Icon name="arrow-left" size={20} />
                </ExTouchableOpacity>
                <Text style={styles.titleText}>Friend Requests</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {requests.value && requests.value.requests.map((request, index ) => (
                    <View key={index}>
                        <ExTouchableOpacity onPress={() => redirectToUserProfile(request.id)} style={styles.item}>
                            <Image style={styles.itemImage} source ={{uri : request.avatar_image}} />
                            <Text style={styles.itemName}>{request.username}</Text>
                        </ExTouchableOpacity>
                    </View>
                ))}
            </ScrollView>
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
    titleText : {
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
        paddingVertical: 15,
        borderBottomColor: "rgba(0,0,0,0.1)",
        borderBottomWidth: 2
    },
    itemImage: {
        width: 50,
        height: 50
    },
    itemName: {
        fontSize: 16,
        fontWeight: 500
    }
});

export default ListFriendRequestScreen;