import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from '../Routes';
import {screenOptions} from '../NavigationRouter';
import SplashScreen from '../../features/SplashScreen';
import LoginScreen from '../../features/unauthscreens/LoginScreen';
import RegisterScreen from '../../features/unauthscreens/RegisterScreen';

const StackNavigator = createStackNavigator();

export const UnAuthNavigationStack = () => {
    return (
        <StackNavigator.Navigator initialRouteName={Routes.SPLASH_SCREEN}>
            <StackNavigator.Screen
                name={Routes.SPLASH_SCREEN}
                component={SplashScreen}
                options={screenOptions}
            />
            <StackNavigator.Screen
                name={Routes.LOGIN_SCREEN}
                component={LoginScreen}
                options={screenOptions}
            />
            <StackNavigator.Screen
                name={Routes.REGISTER_SCREEN}
                component={RegisterScreen}
                options={screenOptions}
            />
        </StackNavigator.Navigator>
    );
};
