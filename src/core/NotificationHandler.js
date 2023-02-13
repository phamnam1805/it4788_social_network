import Toast from 'react-native-toast-message';
import {notificationActions, notificationOperations} from './slice/Notification';
import {navigation} from '../core/Navigation';
import {Routes} from './Routes';
import {postOperations} from './slice/Post';

const NotificationHandler = {
    onNotificationReceived: async (dispatch, userId, remoteMessage) => {
        const notification = remoteMessage.notification;
        const data = remoteMessage.data;
        if (data.type === 'PROFILE' || data.type === 'POST' || data.type === 'NONE') {
            console.log(data);
            const objectId = data.object_id;
            dispatch(notificationActions.pushNotification(data));
            const pressHandler = () => {
                if (data.type === 'PROFILE') {
                    if (userId === objectId) {
                        return navigation.navigate('Profile');
                    }
                    navigation.navigate(Routes.OTHER_PROFILE_SCREEN, {
                        userId: userId,
                    });
                } else if (data.type === 'POST') {
                    dispatch(postOperations.handleClickNoti(objectId));
                }
                Toast.hide();
            };
            Toast.show({
                type: 'info',
                text1: notification.title,
                text2: notification.body,
                onPress: () => pressHandler(),
                onHide: () =>
                    dispatch(notificationOperations.fetchSetReadNotification({notiIndex: 0})),
            });
        }

        // notificationActions.pushNotification(remoteMessage.notif)
    },
};

export default NotificationHandler;
