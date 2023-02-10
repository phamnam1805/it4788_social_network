import React from 'react';
import {View, Text, Platform} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {STATUSBAR_HEIGHT} from '../Constants';
import {HomeNavigationStack} from './HomeNavigationStack';
import {FriendRequestNavigationStack} from './FriendRequestNavigationStack';
import {UserProfileNavigationStack} from './UserProfileNavigationStack';
import {NotificationNavigationStack} from './NotificationNavigationStack';
import {ShortcutNavigationStack} from './ShortcutNavigationStack';
import {Routes} from '../Routes';

import FullPostToolScreen from '../../features/authscreens/homescreens/FullPostToolScreen';
import CommentScreen from '../../features/authscreens/homescreens/CommentScreen';
import PostDetailScreen from '../../features/authscreens/homescreens/PostDetailScreen';

const TopTab = createMaterialTopTabNavigator();
const StackNavigator = createStackNavigator();

export const MainTab = ({navigation}) => {
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
    const TransitionPreset = Platform.OS === 'ios' ? TransitionPresets.ModalSlideFromBottomIOS : {};
    const navigationOptions = {
        headerShown: false,
        ...TransitionPreset,
    };
    return (
        <StackNavigator.Navigator
            screenOptions={navigationOptions}
            initialRouteName={Routes.MAIN_TAB}>
            <StackNavigator.Screen name={Routes.MAIN_TAB} component={MainTab} />
            <StackNavigator.Screen
                name={Routes.FULL_POST_TOOL_SCREEN}
                component={FullPostToolScreen}
            />
            <StackNavigator.Screen name={Routes.COMMENT_SCREEN} component={CommentScreen} />
            <StackNavigator.Screen name={Routes.POST_DETAIL_SCREEN} component={PostDetailScreen} />
        </StackNavigator.Navigator>
    );
    // return (
    //     <View>
    //         <Text>Auth</Text>
    //     </View>
    // );
};
