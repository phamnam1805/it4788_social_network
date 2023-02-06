import React, {Component} from 'react';
import {
    Animated,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native';
import {ScrollView, PanGestureHandler, State} from 'react-native-gesture-handler';

import Comment from '../../../components/Comment';
import {FIXED_STATUSBAR_HEIGHT} from '../../../core/Constants';

const CommentScreen = () => {};

export default CommentScreen;

const STACK_NAVBAR_HEIGHT = 48;
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    keyboardAvoidingContainer: {
        height: screenHeight,
        zIndex: 2,
    },
    wrapper: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '100%',
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
    },
    container: {
        padding: 10,
        marginBottom: FIXED_STATUSBAR_HEIGHT + STACK_NAVBAR_HEIGHT + 50,
        backgroundColor: '#ffffff',
    },
    commentInputWrapper: {
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: '#ddd',
        position: 'absolute',
        bottom: FIXED_STATUSBAR_HEIGHT + STACK_NAVBAR_HEIGHT,
        left: 0,
        paddingHorizontal: 15,
        height: 50,
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconItem: {
        width: 30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraIconWrapper: {
        backgroundColor: '#ddd',
        borderRadius: 50,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputWrapper: {
        height: 40,
        borderTopLeftRadius: 48,
        borderBottomLeftRadius: 48,
        backgroundColor: '#ddd',
        marginLeft: 10,
        width: screenWidth - 40 - 80 - 30 - 10,
        borderRightWidth: 0,
    },
    textInput: {
        width: '100%',
        height: 40,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    iconWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderTopRightRadius: 48,
        borderBottomRightRadius: 48,
        height: 40,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 0,
    },
    navigationStackBar: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    btnBack: {
        zIndex: 99,
    },
    stackBarTitle: {
        position: 'absolute',
        width: screenWidth,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: 40,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
});
