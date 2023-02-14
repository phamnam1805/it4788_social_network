import React from 'react';
import {View, Text, Platform} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {STATUSBAR_HEIGHT} from '../Constants';
import {HomeNavigationStack} from './HomeNavigationStack';
import {UserProfileNavigationStack} from './UserProfileNavigationStack';
import {NotificationNavigationStack} from './NotificationNavigationStack';
import {ShortcutNavigationStack} from './ShortcutNavigationStack';
import {Routes} from '../Routes';

import FullPostToolScreen from '../../features/authscreens/homescreens/FullPostToolScreen';
import CommentScreen from '../../features/authscreens/CommentScreen';
import ImageViewScreen from '../../features/authscreens/ImageViewScreen';
import TermsAndPoliciesScreen from '../../features/authscreens/shortcutscreens/TermsAndPoliciesScreen';
import SettingsScreen from '../../features/authscreens/shortcutscreens/settingscreens';
import ProfileSettingsScreen from '../../features/authscreens/shortcutscreens/settingscreens/ProfileSettingsScreen';
import PersonalInformationScreen from '../../features/authscreens/shortcutscreens/settingscreens/PersonalInformationScreen';
import ChangeNameScreen from '../../features/authscreens/shortcutscreens/settingscreens/ChangeNameScreen';
import BlockingListScreen from '../../features/authscreens/shortcutscreens/BlockingListScreen';
import SettingProfilePageScreen from '../../features/authscreens/userprofilescreens/SettingProfilePageScreen';
import EditProfilePageScreen from '../../features/authscreens/userprofilescreens/EditProfilePageScreen';
import OtherProfileScreen from '../../features/authscreens/userprofilescreens/OtherProfileScreen';
import ListFriendRequestScreen from '../../features/authscreens/shortcutscreens/ListFriendRequestsScreen';
import PushSettingsScreen from '../../features/authscreens/shortcutscreens/PushSettingsScreen';
import ChangePasswordScreen from '../../features/authscreens/shortcutscreens/ChangePasswordScreen';
import AllFriendsScreen from '../../features/authscreens/userprofilescreens/AllFriendsScreen';
import PostDetailScreen from '../../features/authscreens/PostDetailScreen';
import MessageNavigationStack from './MessageNavigationStack';
import AddBlockListScreen from '../../features/authscreens/shortcutscreens/AddBlockListScreen';
import OtherProfileSettingScreen from '../../features/authscreens/userprofilescreens/OtherProfileSettingScreen';
import SearchPostScreen from '../../features/authscreens/userprofilescreens/SearchPostScreen';
import ChannelScreen from '../../features/authscreens/messagescreens/ChannelScreen';

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
                        <MaterialCommunityIcon
                            name="message"
                            size={20}
                            color={focused ? '#318bfb' : '#ddd'}></MaterialCommunityIcon>
                    ),
                }}
                name={Routes.MESSAGE_TAB}
                component={MessageNavigationStack}
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
            <StackNavigator.Screen name={Routes.CHANNEL_SCREEN} component={ChannelScreen} />
            <StackNavigator.Screen
                name={Routes.FULL_POST_TOOL_SCREEN}
                component={FullPostToolScreen}
            />
            <StackNavigator.Screen name={Routes.POST_DETAIL_SCREEN} component={PostDetailScreen} />
            <StackNavigator.Screen
                name={Routes.TERMS_AND_POLICIES_SCREEN}
                component={TermsAndPoliciesScreen}
            />
            <StackNavigator.Screen name={Routes.COMMENT_SCREEN} component={CommentScreen} />
            <StackNavigator.Screen name={Routes.IMAGE_VIEW_SCREEN} component={ImageViewScreen} />

            <StackNavigator.Screen name={Routes.ALL_FRIENDS_SCREEN} component={AllFriendsScreen} />
            <StackNavigator.Screen name={Routes.CHANGE_PASSWORD} component={ChangePasswordScreen} />
            <StackNavigator.Screen name={Routes.SET_PUSH_SETTINGS} component={PushSettingsScreen} />
            <StackNavigator.Screen
                name={Routes.LIST_FRIEND_REQUESTS}
                component={ListFriendRequestScreen}
            />
            <StackNavigator.Screen
                name={Routes.OTHER_PROFILE_SCREEN}
                component={OtherProfileScreen}
            />
            <StackNavigator.Screen
                name={Routes.OTHER_PROFILE_SETTINGS_SCREEN}
                component={OtherProfileSettingScreen}
            />
            <StackNavigator.Screen
                name={Routes.EDIT_PROFILE_SCREEN}
                component={EditProfilePageScreen}
            />
            <StackNavigator.Screen
                name={Routes.SETTING_PROFILE_PAGE_SCREEN}
                component={SettingProfilePageScreen}
            />
            <StackNavigator.Screen name={Routes.SETTINGS_SCREEN} component={SettingsScreen} />
            <StackNavigator.Screen
                name={Routes.PROFILE_SETTINGS_SCREEN}
                component={ProfileSettingsScreen}
            />
            <StackNavigator.Screen
                name={Routes.PERSONAL_INFORMATION_SCREEN}
                component={PersonalInformationScreen}
            />
            <StackNavigator.Screen name={Routes.CHANGE_NAME_SCREEN} component={ChangeNameScreen} />
            <StackNavigator.Screen
                name={Routes.BLOCKING_LIST_SCREEN}
                component={BlockingListScreen}
            />
            <StackNavigator.Screen name={Routes.ADD_BLOCKING_LIST} component={AddBlockListScreen} />
            <StackNavigator.Screen name={Routes.SEARCH_POST} component={SearchPostScreen} />
        </StackNavigator.Navigator>
    );
    // return (
    //     <View>
    //         <Text>Auth</Text>
    //     </View>
    // );
};
