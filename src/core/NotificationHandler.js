import Toast from 'react-native-toast-message';
import {notificationActions} from './slice/Notification';

const NotificationHandler = {
    onNotificationReceived: async remoteMessage => {
        // notificationActions.pushNotification(remoteMessage.notif)
        Toast.show({
            type: 'success',
            text1: remoteMessage.title,
            text2: remoteMessage.body,
        });
    },
};

export default NotificationHandler;
