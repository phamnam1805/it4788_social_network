import React, {Component, useEffect, useState} from 'react';
import {Text, StyleSheet, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {SCREEN_WIDTH} from '../core/Constants';
import ExTouchableOpacity from './ExTouchableOpacity';

const Description = ({content}) => {
    return <Text style={styles.pureTxt}>{content}</Text>;
};

const NotificationItem = ({item}) => {
    const displayAvatarUri = item.avatar;
    const [icon, setIcon] = useState({});
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
                break;
        }
    }, [item.type, item.title]);

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
                style={{...styles.container, backgroundColor: item.read ? '#fff' : '#edf2fa'}}>
                <ImageBackground
                    imageStyle={{borderRadius: 64}}
                    style={styles.avatar}
                    source={{uri: displayAvatarUri}}>
                    <View style={{...styles.notificationIcon, backgroundColor: icon.bgColor}}>
                        <FontAwesome5Icon name={icon.name} size={icon.size} color={icon.color} />
                    </View>
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
