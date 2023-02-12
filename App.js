/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StyleSheet, View, PermissionsAndroid} from 'react-native';

import {useDispatch, Provider} from 'react-redux';
import {NavigationRouter} from './src/core/NavigationRouter';
import {appOperations} from './src/core/slice/App';
import store from './src/core/ReduxStore';
import {
    getFcmToken,
    requestUserPermission,
    setupNotificationServices,
} from './src/utils/NotificationUtils';

export function GlobalComponents() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appOperations.initialize());
        requestUserPermission().then(async isEnabled => {
            if (isEnabled) {
                const token = await getFcmToken();
                console.log('FCM Token: ', token);
            }
        });
        setupNotificationServices();
    }, [dispatch]);

    return (
        <View style={styles.globalComponents}>
            <NavigationRouter />
        </View>
    );
}

const App = () => {
    return (
        // <View></View>
        <Provider store={store}>
            <GlobalComponents />
        </Provider>
    );
};
export default App;

const styles = StyleSheet.create({
    globalComponents: {
        flex: 1,
    },
    globalComponentsInner: {
        height: 0,
    },
});
