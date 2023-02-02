import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {Routes} from '../Routes';
import ShortcutScreen from '../../features/authscreens/shortcutscreens/ShortcutScreen';

const StackNavigator = createStackNavigator();

export const ShortcutNavigationStack = () => {
    return (
        <StackNavigator.Navigator screenOptions={{headerShown: false}}>
            <StackNavigator.Screen name={Routes.SHORTCUT_SCREEN} component={ShortcutScreen} />
        </StackNavigator.Navigator>
    );
};
