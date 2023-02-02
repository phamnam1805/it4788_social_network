/* eslint-disable react-native/no-inline-styles */
// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
    //State for ActivityIndicator animation
    // const [animating, setAnimating] = useState(true);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setAnimating(false);
    //         //Check if user_id is set or not
    //         //If not then send for Authentication
    //         //else send to Home Screen
    //         AsyncStorage.getItem('jwt_token').then(value =>
    //             navigation.replace(value === null ? 'Auth' : 'RootTab'),
    //         );
    //     }, 5000);
    // }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../assets/icons/facebook.png')}
                style={{width: '20%', resizeMode: 'contain', margin: 30}}
            />
            <ActivityIndicator
                animating={true}
                color="#FFFFFF"
                size="large"
                style={styles.activityIndicator}
            />
        </SafeAreaView>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d3dde8',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});
