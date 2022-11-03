import 'react-native-gesture-handler';
// Import React and Component
import React from 'react';
import {Platform} from 'react-native';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Import Screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Home from './screens/maintabs/Home';
import Profile from './screens/maintabs/Profile';
import Notification from './screens/maintabs/Notification';
import ShortCut from './screens/maintabs/ShortCut';
import Friend from './screens/maintabs/Friend';
import {STATUSBAR_HEIGHT} from './constants';
import {navigationRef} from './RootNavigation';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Auth = () => {
    // Stack Navigator for Login and Sign up Screen
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{
                    title: 'Register', //Set Header Title
                    headerStyle: {
                        backgroundColor: '#d3dde8', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
};

const MainTab = () => {
    const navigationOptions = {
        tabBarStyle: {
            paddingTop: STATUSBAR_HEIGHT,
        },
        tabBarShowIcon: true,
        tabBarShowLabel: false,
    };

    return (
        <Tab.Navigator screenOptions={navigationOptions} initialRouteName="Home">
            <Tab.Screen
                options={{
                    tabBarIcon: ({tintColor, focused}) => (
                        <Icon name="home" size={20} color={focused ? '#318bfb' : '#ddd'} />
                    ),
                }}
                name="Home"
                component={Home}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({tintColor, focused}) => (
                        <Icon name="users" size={20} color={focused ? '#318bfb' : '#ddd'} />
                    ),
                }}
                name="Friend"
                component={Friend}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({tintColor, focused}) => (
                        <Icon name="user-circle" size={22} color={focused ? '#318bfb' : '#ddd'} />
                    ),
                }}
                name="Profile"
                component={Profile}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({tintColor, focused}) => (
                        <Icon name="bell" size={22} color={focused ? '#318bfb' : '#ddd'} />
                    ),
                }}
                name="Notification"
                component={Notification}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({tintColor, focused}) => (
                        <Icon name="bars" size={20} color={focused ? '#318bfb' : '#ddd'} />
                    ),
                }}
                name="ShortCut"
                component={ShortCut}
            />
        </Tab.Navigator>
    );
};

const RootTab = props => {
    const TransitionPreset = Platform.OS === 'ios' ? TransitionPresets.ModalSlideFromBottomIOS : {};
    const navigationOptions = {
        headerShown: false,
        ...TransitionPreset,
        // gestureResponseDistance: {
        //     vertical: 800,
        // },
        // showIcon: true,
        // showLabel: false,
        headerBackVisible: false,
    };
    return (
        <RootStack.Navigator screenOptions={navigationOptions} initialRouteName="MainTab">
            <RootStack.Screen name="MainTab" component={MainTab} />
        </RootStack.Navigator>
    );
};

const App = () => {
    const TransitionPreset = Platform.OS === 'ios' ? TransitionPresets.ModalSlideFromBottomIOS : {};
    const navigationOptions = {
        headerShown: false,
        ...TransitionPreset,
        // gestureResponseDistance: {
        //     vertical: 800,
        // },
    };
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={navigationOptions}>
                {/* SplashScreen which will come once for 5 Seconds */}
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    // Hiding header for Splash Screen
                    options={{headerShown: false}}
                />
                {/* Auth Navigator: Include Login and Signup */}
                <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}} />
                {/* Navigation Drawer as a landing page */}
                <Stack.Screen name="RootTab" component={RootTab} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
