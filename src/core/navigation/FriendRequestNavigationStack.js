import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {Routes} from '../Routes';
import FriendRequestScreen from '../../features/authscreens/friendrequestscreens/FriendRequestScreen';

const StackNavigator = createStackNavigator();

export const FriendRequestNavigationStack = () => {
    return (
        <StackNavigator.Navigator screenOptions={{headerShown: false}}>
            <StackNavigator.Screen
                name={Routes.FRIEND_REQUEST_SCREEN}
                component={FriendRequestScreen}
            />
        </StackNavigator.Navigator>
    );
};
