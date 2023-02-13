import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const ChannelItem = ({item}) => {
    return (
        <TouchableOpacity>
            <View
                style={{
                    ...styles.container,
                    backgroundColor: item.unreadMessageCount > 0 ? '#edf2fa' : '#fff',
                }}>
                <View>
                    <Image source={item.image} style={styles.profileImage} />
                </View>
                <View>
                    <View>
                        <View style={styles.subContainer}>
                            <Text style={styles.userName}>
                                {item.userName}{' '}
                                {item.isMuted ? (
                                    <IoniconsIcon name="volume-mute" size={16} />
                                ) : null}
                            </Text>
                            <Text style={styles.lastMsgTime}>{item.lastMessageTime}</Text>
                        </View>
                        <View style={styles.subContainer}>
                            <Text style={styles.message} numberOfLines={2} ellipsizeMode="tail">
                                {item.lastMessage}
                            </Text>
                            {item.unreadMessageCount > 0 ? (
                                <Text style={styles.unreadCount}>{item.unreadMessageCount}</Text>
                            ) : null}
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
