import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export const getFcmToken = async () => {
    let token = await messaging().getToken();
    return token;
};

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    console.log('Authorization status:', authStatus);
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    return enabled;
};

export const setupNotificationServices = () => {
    PushNotification.createChannel(
        {
          channelId: 'fcm_fallback_notification_channel', // (required)
          channelName: 'Default', // (required)
          channelDescription: 'Default channel', // (optional) default: undefined.
          soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          vibrate: false, // (optional) default: true. Creates the default vibration patten if true.
        },
        created => console.log(`createChannel returned '${created}'`),
    );

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    // Foreground Message Handling
    messaging().onMessage(async remoteMessage => {
        console.log('Notification in Foreground:', remoteMessage);
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });

    // Set Background handler
    messaging().setBackgroundMessageHandler(remoteMessage => {
        if (remoteMessage) {
            console.log(
                'Notification caused app to open from background:',
                remoteMessage.notification,
            );
        }
    });
};
