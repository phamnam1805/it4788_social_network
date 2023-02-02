import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Linking, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {navigationRef} from './Navigation';
import {TransitionPresets} from '@react-navigation/stack';
import {authenticationSelectors} from './slice/Authentication';
import {UnAuthNavigationStack} from './navigation/UnAuthNavigationStack';

const forFade = ({current, closing}) => ({
    cardStyle: {
        opacity: current.progress,
    },
});
const TransitionPreset = Platform.OS === 'ios' ? TransitionPresets.ModalSlideFromBottomIOS : {};

export const screenOptions = {
    headerShown: false,
    ...TransitionPreset,
    headerBackVisible: false,
};

if (Platform.OS === 'android') {
    screenOptions.cardStyleInterpolator = forFade;
}

export function NavigationRouter() {
    const isLoggedIn = useSelector(authenticationSelectors.isLoggedIn);
    return (
        <NavigationContainer screenOptions={screenOptions} ref={navigationRef}>
            <UnAuthNavigationStack />
            {/* {isLoggedIn ? <AuthNavigationStack /> : <UnAuthNavigationStack />} */}
        </NavigationContainer>
    );
}
