import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, BackHandler } from 'react-native';
import React, { useState } from 'react';
import { SCREEN_WIDTH } from '../../../core/Constants'
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Animated from 'react-native-reanimated';
import Collapsible from 'react-native-collapsible';
import * as navigation from '../../../core/Navigation';
import { Routes } from '../../../core/Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {appOperations} from '../../../core/slice/App';

const ShortcutScreen = () => {

    const [isShowMoreHelpAndSupport, setShowMoreHelpAndSupport] = useState(false);
    const [isShowSettingAndPrivacy, setShowSettingAndPrivacy] = useState(false);
    const dispatch = useDispatch();

    const onPressViewMyProfileHandler = () => {

    }

    const onOpenTermsAndPolicies = () => {
        navigation.navigate(Routes.TERMS_AND_POLICIES_SCREEN);
    }

    const logout = () => {
        dispatch(appOperations.logout())
    }

    const quitApp = () => {
        Alert.alert(
            'Exit App',
            'Do you want to exit?',
            [
              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Yes', onPress: () => BackHandler.exitApp()},
            ],
            { cancelable: false });
            return true;
    }

    return (
        <View style={styles.container}>
            <ScrollView bounces={false}>
                <ExTouchableOpacity style={styles.btnProfile} onPress={onPressViewMyProfileHandler}>
                    <Image style={styles.avatar} source={{ uri: "https://picsum.photos/536/354" }} />
                    <View>
                        <Text style={styles.name}>NGUYEN MINH CHI</Text>
                        <Text style={{ color: '#333' }}>View your profile page</Text>
                    </View>
                </ExTouchableOpacity>
                <ExTouchableOpacity onPress={()=> setShowMoreHelpAndSupport(!isShowMoreHelpAndSupport)} style={styles.btnCollapseOptions}>
                    <View style={styles.btnCollapseOption} >
                        <Image style={styles.icon} source={require('../../../assets/icons/question-mark.png')} />
                        <View>
                            <Text style={styles.name}>Help & Support</Text>
                        </View>
                    </View>
                    <FontAwesome5Icon style={styles.btnCollapseOptionsChevron} name={isShowMoreHelpAndSupport ? "chevron-up" : "chevron-down"} size={20}/>
                </ExTouchableOpacity>
                <Collapsible collapsed={!isShowMoreHelpAndSupport}>
                    <View style={{backgroundColor: "#ffffff"}}>
                        <ExTouchableOpacity style={styles.btnCollapseInnerOption}>
                                <Image style={styles.icon} source={require('../../../assets/icons/question-mark.png')} />
                                <View>
                                    <Text style={styles.name}>Terms & Policies</Text>
                                </View>
                        </ExTouchableOpacity>
                    </View>
                </Collapsible>

                <ExTouchableOpacity onPress={()=> setShowSettingAndPrivacy(!isShowSettingAndPrivacy)} style={styles.btnCollapseOptions}>
                    <View style={styles.btnCollapseOption} >
                        <Image style={styles.icon} source={require('../../../assets/icons/gear.png')} />
                        <View>
                            <Text style={styles.name}>Setting & Privacy</Text>
                        </View>
                    </View>
                    <FontAwesome5Icon style={styles.btnCollapseOptionsChevron} name={isShowSettingAndPrivacy ? "chevron-up" : "chevron-down"} size={20}/>
                </ExTouchableOpacity>
                <Collapsible collapsed={!isShowSettingAndPrivacy}>
                    <View style={{backgroundColor: "#ffffff"}}>
                        <ExTouchableOpacity onPress={onOpenTermsAndPolicies} style={styles.btnCollapseInnerOption}>
                                <Image style={styles.icon} source={require('../../../assets/icons/bookmark.png')} />
                                <View>
                                    <Text style={styles.name}>Terms & Policies</Text>
                                </View>
                        </ExTouchableOpacity>
                    </View>
                </Collapsible>

                <ExTouchableOpacity onPress={logout} style={styles.btnCollapseOption} >
                    <Image style={styles.icon} source={require('../../../assets/icons/logout.png')} />
                    <View>
                        <Text style={styles.name}>Logout</Text>
                    </View>
                </ExTouchableOpacity>
                <ExTouchableOpacity onPress={quitApp} style={styles.btnCollapseOption} >
                    <Image style={styles.icon} source={require('../../../assets/icons/logout.png')} />
                    <View>
                        <Text style={styles.name}>Quit App</Text>
                    </View>
                </ExTouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    btnProfile: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    btnCollapseOption: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 15,
    },
    btnCollapseOptions: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        paddingRight: 20
    },
    btnCollapseOptionsChevron: {

    },
    btnCollapseInnerOption:{
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 15,
        marginHorizontal: 20,
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 10,
        
        backgroundColor: '#f0f1f2',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset : { width: 1, height: 13},
    },
    avatar: {
        height: 32,     
        width: 32,
        borderRadius: 32,
        marginRight: 10,
        borderColor: '#333',
        borderWidth: 0.2
    },
    icon: {
        height: 24,
        resizeMode: 'contain',
        marginRight: 10
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    centerBtnShowMore: {
        width: SCREEN_WIDTH - 100
    }
})

export default ShortcutScreen;
