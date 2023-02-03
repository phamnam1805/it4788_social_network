import React, {Component} from 'react';
import {
    Keyboard,
    Animated,
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
    PanGestureHandler,
    State,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

import {userSelectors} from '../../../core/slice/User';
import {Routes} from '../../../core/Routes';
import {navigation} from '../../../core/Navigation';

const FullPostToolScreen = () => {
    const user = useSelector(userSelectors.getUser);

    const _editorWrapperHeight = new Animated.Value(100);
    this.state = {
        selectedBgColorId: 0,
    };
    const _isShowBgColors = true;
    const _bgColorListWidth = new Animated.Value(screenWidth - 60);
    const _toggleZindexValue = new Animated.Value(2);
    const _degTransformToggle = new Animated.Value(0);
    const _scaleTransformToggle = new Animated.Value(0);
    const _isKeyBoardVisibled = false;
    const _distanceTopOption = new Animated.Value(0);
    const _prevTranslatetionY = 0;
    return (
        <View>
            <Text>FullPostTool</Text>
        </View>
    );
};

export default FullPostToolScreen;

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    parentContainer: {
        height: screenHeight,
        position: 'relative',
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
    },
    navigationBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        height: 50,
    },
    naviIcon: {
        padding: 10,
    },
    naviTitle: {
        paddingHorizontal: 10,
        fontSize: 16,
    },
    btnPost: {
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
    },
    infoWrapper: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    areaWrapper: {
        flexDirection: 'row',
    },
    areaOption: {
        marginRight: 10,
        paddingHorizontal: 5,
        paddingVertical: 2.5,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        marginRight: 10,
        borderRadius: 50,
        width: 40,
        height: 40,
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    editorWrapper: {
        overflow: 'hidden',
        padding: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
    },
    editor: {
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    toolOptionsWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        paddingBottom: 55,
    },
    optionsWrapper: {
        backgroundColor: '#fff',
        position: 'absolute',
        width: '100%',
        left: 0,
        zIndex: 999999,
    },
    optionTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 55,
        alignItems: 'center',
        borderTopColor: '#ddd',
        borderTopWidth: 1,
    },
    optionImagesWrapper: {
        flexDirection: 'row',
        zIndex: 1,
    },
    optionImage: {
        height: 25,
        resizeMode: 'contain',
    },
    bgColorsWrapper: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 50,
    },
    bgColorsScrollView: {
        flexDirection: 'row',
    },
    btnBgColor: {
        height: 30,
        width: 30,
    },
    bgColor: {
        height: 30,
        width: 30,
        marginHorizontal: 5,
    },
    bgImage: {
        resizeMode: 'cover',
        height: 30,
        width: 30,
        borderRadius: 10,
        borderWidth: 1,
    },
    toggleBgColors: {
        padding: 5,
        borderWidth: 0,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    moreBgColors: {},
});
