import messaging from '@react-native-firebase/messaging';

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
