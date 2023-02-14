import {Text, View, StyleSheet, Image} from 'react-native';
import ExTouchableOpacity from './ExTouchableOpacity';
import * as navigation from '../core/Navigation';
import {BASE_URL, LogicCode, SCREEN_WIDTH} from '../core/Constants';
import {Routes} from '../core/Routes';
import {useSelector} from 'react-redux';
import {appSelectors} from '../core/slice/App';
import {useAsync} from 'react-use';
import axios from 'axios';

const FriendsShowing = ({userId}) => {
    const token = useSelector(appSelectors.getToken);

    const onFindFriends = () => {
        navigation.navigate(Routes.LIST_FRIEND_REQUESTS);
    };

    const onSeeAllFriends = () => {
        navigation.navigate(Routes.ALL_FRIENDS_SCREEN, {userId: userId});
    };

    const redirectToProfile = userId => {
        navigation.navigate(Routes.OTHER_PROFILE_SCREEN, {userId: userId});
    };

    const friends = useAsync(async () => {
        var res = await axios.post(BASE_URL + '/it4788/get_user_friends', {
            token: token,
            user_id: userId,
            index: 0,
            count: 6,
        });

        if (res.data.code == LogicCode.SUCCESS) {
            return res.data.data.friends;
        }
        return null;
    }, [token, userId]);

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Friends</Text>
                <ExTouchableOpacity onPress={onFindFriends}>
                    <Text style={styles.findFriends}>Find Friends</Text>
                </ExTouchableOpacity>
            </View>
            <View style={styles.container}>
                {friends.value
                    ? friends.value.map((friend, index) => (
                          <ExTouchableOpacity
                              onPress={() => redirectToProfile(friend.id)}
                              style={styles.item}
                              key={index}>
                              <Image style={styles.itemImage} source={{uri: friend.avatar_image}} />
                              <Text style={styles.itemName}>{friend.username}</Text>
                          </ExTouchableOpacity>
                      ))
                    : [1, 2, 3, 4, 5, 6].map((i, index) => (
                          <View key={index} style={styles.item}>
                              <Image
                                  style={styles.itemImage}
                                  source={{uri: 'https://picsum.photos/536/354'}}
                              />
                              <Text style={styles.itemName}>Name</Text>
                          </View>
                      ))}
            </View>
            <ExTouchableOpacity onPress={onSeeAllFriends} style={styles.seeAll}>
                <Text style={styles.seeAllText}>See all friends</Text>
            </ExTouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
    },
    findFriends: {
        color: 'blue',
        fontSize: 14,
        fontWeight: 500,
    },
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        marginBottom: 5,
        marginTop: 5,
    },
    itemName: {
        fontWeight: 500,
        fontSize: 15,
        color: '#000',
    },
    itemImage: {
        width: SCREEN_WIDTH / 3 - 20,
        height: SCREEN_WIDTH / 3 - 20,
        borderRadius: 10,
    },
    seeAll: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingVertical: 10,
    },
    seeAllText: {
        color: 'black',
        fontWeight: 500,
        fontSize: 15,
    },
});

export default FriendsShowing;
