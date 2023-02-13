import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {Routes} from '../Routes';
import MessageScreen from '../../features/authscreens/messagescreens/MessageScreen';

const StackNavigator = createStackNavigator();

const MessageNavigationStack = () => {
    return (
        <StackNavigator.Navigator screenOptions={{headerShown: false}}>
            <StackNavigator.Screen name={Routes.MESSAGE_SCREEN} component={MessageScreen} />
        </StackNavigator.Navigator>
    );
};

export default MessageNavigationStack;
