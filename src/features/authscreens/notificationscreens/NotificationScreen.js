import React, {Component, useState} from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {notificationSelectors, notificationOperations} from '../../../core/slice/Notification';
import NotificationItem from '../../../components/NotificationItem';

const NotificationScreen = () => {
    const notifications = useSelector(notificationSelectors.getAllNotifications);

    const dispatch = useDispatch();

    const [isReload, setIsReload] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);

    const handleReload = () => {
        if (!isReload && !isLoadMore) {
            setIsReload(true);
            dispatch(notificationOperations.fetchGetListNotifications({reloadFlag: true})).then(
                () => {
                    setIsReload(false);
                },
            );
        }
    };

    const handleLoadMore = () => {
        if (!isLoadMore && !isReload) {
            setIsLoadMore(true);
            dispatch(notificationOperations.fetchGetListNotifications({})).then(() => {
                setTimeout(() => setIsLoadMore(false), 2000);
            });
        }
    };
    return (
        <View>
            <FlatList
                data={notifications}
                ListEmptyComponent={<View />}
                ListFooterComponent={() => isLoadMore && <ActivityIndicator size="large" />}
                onRefresh={handleReload}
                refreshing={isReload}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
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
