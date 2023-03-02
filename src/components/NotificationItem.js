import React, {Component, useEffect, useState} from 'react';
import {Text, StyleSheet, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import {SCREEN_WIDTH} from '../core/Constants';
import ExTouchableOpacity from './ExTouchableOpacity';
import {appSelectors} from '../core/slice/App';
import {navigation} from '../core/Navigation';
import {Routes} from '../core/Routes';
import {postOperations} from '../core/slice/Post';
import {notificationOperations} from '../core/slice/Notification';

const Description = ({content}) => {
    return <Text style={styles.pureTxt}>{content}</Text>;
};

const NotificationItem = ({index, item}) => {
    const displayAvatarUri = item.avatar;
    const userId = useSelector(appSelectors.getUserId);
    const [icon, setIcon] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        switch (item.type) {
            case 'POST':
                setIcon({
                    name: 'comment-alt',
                    color: '#fff',
                    size: 14,
                    bgColor: '#63BE09',
                });
                break;
            case 'PROFILE':
                setIcon({
                    name: 'user',
                    color: '#fff',
                    size: 14,
                    bgColor: '#318bfb',
                });
                break;
            case 'NONE':
                setIcon({
                    name: 'notifications-outline',
                    color: '#fff',
                    size: 14,
                    bgColor: '#318bfb',
                });
                break;
        }
    }, [item.type, item.title]);

    const onNotiPressHandler = () => {
        const objectId = item.object_id;
        if (item.type === 'PROFILE') {
            if (userId === objectId) {
                return navigation.navigate('Profile');
            }
            navigation.navigate(Routes.OTHER_PROFILE_SCREEN, {
                userId: objectId,
            });
        } else if (item.type === 'POST') {
            dispatch(postOperations.handleClickNoti(objectId));
        }
        dispatch(notificationOperations.fetchSetReadNotification({notiIndex: index}));
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
        <View style={{backgroundColor: 'rgba(0,0,0,0.3)'}}>
            <ExTouchableOpacity
                style={{...styles.container, backgroundColor: item.read ? '#fff' : '#edf2fa'}}
                onPress={onNotiPressHandler}>
                <ImageBackground
                    imageStyle={{borderRadius: 64}}
                    style={styles.avatar}
                    source={{uri: displayAvatarUri}}>
                    {item.type === 'NONE' ? (
                        <View style={{...styles.notificationIcon, backgroundColor: icon.bgColor}}>
                            <IoniconsIcon name={icon.name} size={icon.size} color={icon.color} />
                        </View>
                    ) : (
                        <View style={{...styles.notificationIcon, backgroundColor: icon.bgColor}}>
                            <FontAwesome5Icon
                                name={icon.name}
                                size={icon.size}
                                color={icon.color}
                            />
                        </View>
                    )}
                </ImageBackground>
                <View style={styles.contentWrapper}>
                    <Description content={item.title} />
                    <Text style={{color: '#333'}}>{convertTime(item.created_at)}</Text>
                </View>
            </ExTouchableOpacity>
        </View>
    );
};

export default NotificationItem;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    avatar: {
        height: 64,
        width: 64,
        position: 'relative',
        borderRadius: 64,
        borderColor: '#ddd',
        borderWidth: 0.5,
    },
    contentWrapper: {
        width: SCREEN_WIDTH - 40 - 30 - 64,
        paddingHorizontal: 10,
    },
    mainContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    btnOptions: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignContent: 'center',
    },
    pureTxt: {
        fontSize: 16,
        color: '#000',
    },
    hightlightTxt: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    notificationIcon: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        height: 25,
        width: 25,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
