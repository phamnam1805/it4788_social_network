import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {notificationSelectors} from '../../../core/slice/Notification';
import NotificationItem from '../../../components/NotificationItem';

const NotificationScreen = () => {
    const notifications = useSelector(notificationSelectors.getAllNotifications);
    return (
        <View>
            <FlatList
                data={notifications}
                renderItem={({item, index}) => {
                    return (
                        <NotificationItem key={item.notification_id} index={index} item={item} />
                    );
                }}
            />
        </View>
    );
};

export default NotificationScreen;
