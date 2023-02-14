import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {navigation} from '../core/Navigation';
import {Routes} from '../core/Routes';

const ChannelItem = ({item, index}) => {
    const onChannelItemPressHandler = () => {
        navigation.navigate(Routes.CHANNEL_SCREEN, {
            index: index,
            conversationId: item.id,
            partner: item.partner,
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
        <TouchableOpacity onPress={onChannelItemPressHandler}>
            <View
                style={{
                    ...styles.container,
                    backgroundColor: item.unreadMessageCount > 0 ? '#edf2fa' : '#fff',
                }}>
                <View>
                    <Image source={{uri: item.partner.avatar}} style={styles.profileImage} />
                </View>
                <View>
                    <View>
                        <View style={styles.subContainer}>
                            <Text style={styles.userName}>{item.partner.username}</Text>
                            <Text style={styles.lastMsgTime}>
                                {convertTime(item.last_message.created)}
                            </Text>
                        </View>
                        <View style={styles.subContainer}>
                            <Text style={styles.message} numberOfLines={2} ellipsizeMode="tail">
                                {item.last_message.message}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ChannelItem;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
    },
    profileImage: {
        height: 70,
        width: 70,
        borderRadius: 100,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    userName: {
        fontSize: 22,
        color: '#000',
    },
    userNameSmall: {
        fontSize: 16,
        color: '#000',
        marginVertical: 5,
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 300,
    },
    lastMsgTime: {
        fontSize: 16,
    },
    message: {
        width: 250,
    },
    unreadCount: {
        color: '#fff',
        backgroundColor: 'gray',
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 100,
    },
    newUser: {
        color: 'blue',
        fontSize: 19,
        marginTop: 10,
    },
});
