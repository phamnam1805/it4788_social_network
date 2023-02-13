import Toast from 'react-native-toast-message';

const NotificationHandler = {
    onNotificationReceived: async remoteMessage => {
        Toast.show({
            type: 'success',
            text1: remoteMessage.title,
            text2: remoteMessage.body,
        });
    },
};

export default NotificationHandler;
