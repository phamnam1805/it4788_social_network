/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StyleSheet, View, PermissionsAndroid} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch, Provider} from 'react-redux';
import {NativeBaseProvider} from 'native-base';
import {NavigationRouter} from './src/core/NavigationRouter';
import {appOperations} from './src/core/slice/App';
import store from './src/core/ReduxStore';

export function GlobalComponents() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appOperations.initialize());
        // requestUserPermission().then(async isEnabled => {
        //     if (isEnabled) {
        //         const token = await getFcmToken();
        //         console.log('FCM Token: ', token);
        //     }
        // });
    }, [dispatch]);

    return (
        <View style={styles.globalComponents}>
            <NavigationRouter />
            <Toast />
        </View>
    );
}

const App = () => {
    return (
        <Provider store={store}>
            <NativeBaseProvider>
                <GlobalComponents />
            </NativeBaseProvider>
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
