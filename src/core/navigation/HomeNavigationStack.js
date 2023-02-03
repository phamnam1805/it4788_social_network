import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {Routes} from '../Routes';
import HomeScreen from '../../features/authscreens/homescreens/HomeScreen';
import FullPostToolScreen from '../../features/authscreens/homescreens/FullPostToolScreen';

const StackNavigator = createStackNavigator();

export const HomeNavigationStack = () => {
    return (
        <StackNavigator.Navigator screenOptions={{headerShown: false}}>
            <StackNavigator.Screen name={Routes.HOME_SCREEN} component={HomeScreen} />
            <StackNavigator.Screen
                name={Routes.FULL_POST_TOOL_SCREEN}
                component={FullPostToolScreen}
            />
        </StackNavigator.Navigator>
    );
};
