import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {Routes} from '../Routes';
import HomeScreen from '../../features/authscreens/homescreens/HomeScreen';

const StackNavigator = createStackNavigator();

export const HomeNavigationStack = () => {
    return (
        <StackNavigator.Navigator screenOptions={{headerShown: false}}>
            <StackNavigator.Screen name={Routes.HOME_SCREEN} component={HomeScreen} />
        </StackNavigator.Navigator>
    );
};
