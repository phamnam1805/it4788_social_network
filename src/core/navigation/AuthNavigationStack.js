import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {STATUSBAR_HEIGHT} from '../Constants';
import {HomeNavigationStack} from './HomeNavigationStack';
import {FriendRequestNavigationStack} from './FriendRequestNavigationStack';
import {UserProfileNavigationStack} from './UserProfileNavigationStack';
import {NotificationNavigationStack} from './NotificationNavigationStack';
import {ShortcutNavigationStack} from './ShortcutNavigationStack';
import {Routes} from '../Routes';

const TopTab = createMaterialTopTabNavigator();

export const TabNavigatorScreen = () => {
    const navigationOptions = {
        style: {
            paddingTop: STATUSBAR_HEIGHT,
        },
        showIcon: true,
        showLabel: false,
        tabBarShowLabel: false,
    };

    return (
        <TopTab.Navigator screenOptions={navigationOptions}>
            <TopTab.Screen
                options={{
                    tabBarIcon: ({tintColor, focused}) => (
                        <Icon name="home" size={20} color={focused ? '#318bfb' : '#ddd'}></Icon>
                    ),
                }}
                name={Routes.HOME_TAB}
                component={HomeNavigationStack}
            />
            <TopTab.Screen
                options={{
                    tabBarIcon: ({tintColor, focused}) => (
                        <Icon name="users" size={20} color={focused ? '#318bfb' : '#ddd'}></Icon>
                    ),
                }}
                name={Routes.FRIEND_REQUEST_TAB}
                component={FriendRequestNavigationStack}
            />
            <TopTab.Screen
                options={{
                    tabBarIcon: ({tintColor, focused}) => (
                        <Icon
                            name="user-circle"
                            size={22}
                            color={focused ? '#318bfb' : '#ddd'}></Icon>
                    ),
                }}
                name={Routes.USER_PROFILE_TAB}
                component={UserProfileNavigationStack}
            />
            <TopTab.Screen
                options={{
                    tabBarIcon: ({tintColor, focused}) => (
                        <Icon name="bell" size={22} color={focused ? '#318bfb' : '#ddd'}></Icon>
                    ),
                }}
                name={Routes.NOTIFICATION_TAB}
                component={NotificationNavigationStack}
            />
            <TopTab.Screen
                options={{
                    tabBarIcon: ({tintColor, focused}) => (
                        <Icon name="bars" size={20} color={focused ? '#318bfb' : '#ddd'}></Icon>
                    ),
                }}
                name={Routes.SHORTCUT_TAB}
                component={ShortcutNavigationStack}
            />
        </TopTab.Navigator>
    );
};
export const AuthNavigationStack = () => {
    return <TabNavigatorScreen />;
    // return (
    //     <View>
    //         <Text>Auth</Text>
    //     </View>
    // );
};
