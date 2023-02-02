import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {Routes} from '../Routes';
import UserProfileScreen from '../../features/authscreens/userprofilescreens/UserProfileScreen';

const StackNavigator = createStackNavigator();

export const UserProfileNavigationStack = () => {
    return (
        <StackNavigator.Navigator screenOptions={{headerShown: false}}>
            <StackNavigator.Screen
                name={Routes.USER_PROFILE_SCREEN}
                component={UserProfileScreen}
            />
        </StackNavigator.Navigator>
    );
};
