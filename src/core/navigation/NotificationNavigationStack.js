import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {Routes} from '../Routes';
import NotificationScreen from '../../features/authscreens/notificationscreens/NotificationScreen';

const StackNavigator = createStackNavigator();

export const NotificationNavigationStack = () => {
    return (
        <StackNavigator.Navigator screenOptions={{headerShown: false}}>
            <StackNavigator.Screen
                name={Routes.NOTIFICATION_SCREEN}
                component={NotificationScreen}
            />
        </StackNavigator.Navigator>
    );
};
