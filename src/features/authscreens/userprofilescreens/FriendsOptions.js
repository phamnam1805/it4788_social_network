import { Text, View, StyleSheet } from "react-native";
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import ReactNativeModal from "react-native-modal";
import { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import { userSelectors, userOperations } from "../../../core/slice/User";
import { useSelector, useDispatch } from "react-redux";
import { Routes } from "../../../core/Routes";
import * as navigation from '../../../core/Navigation';
import { LogicCode } from "../../../core/Constants";


const FriendOptions = ({isVisible, closeModal, friend}) => {

    const goBack = () => {
        closeModal();
    }

    const onGoFriendsPage = () => {
        navigation.navigate(Routes.ALL_FRIENDS_SCREEN, {userId: friend.id})
        closeModal();
    }

    const onGoProfilePage = () => {
        closeModal();
        navigation.navigate(Routes.OTHER_PROFILE_SCREEN, {userId: friend.id})
    }

    const userInfo = useAsync(() => {
        
    }, [friend])

    return (
        <ReactNativeModal isVisible={isVisible} style={styles.containerModal}>
            <View style={styles.container}>
            <View style={styles.backdrop}>
                <ExTouchableOpacity onPress={goBack} style={{ width: '100%', height: '100%' }}>

                </ExTouchableOpacity>
            </View>
            <View style={styles.postOptionsWrapper}>
                <ExTouchableOpacity style={styles.postOptionItemWrapper} onPress={onGoFriendsPage}>
                    <View style={styles.postOptionItem}>
                        <View style={styles.optionIcon}><FontAwesome5Icon name="images" size={20}></FontAwesome5Icon></View>
                        <View>
                            <Text style={styles.postOptionTitle}>See all friends of {friend.username} </Text>
                        </View>
                    </View>
                </ExTouchableOpacity>
                <ExTouchableOpacity style={styles.postOptionItemWrapper} onPress={onGoProfilePage}>
                    <View style={styles.postOptionItem}>
                        <View style={styles.optionIcon}><FontAwesome5Icon name="images" size={20}></FontAwesome5Icon></View>
                        <View>
                            <Text style={styles.postOptionTitle}> See {friend.username}'s profile page </Text>
                        </View>
                    </View>
                </ExTouchableOpacity>
                <ExTouchableOpacity style={styles.postOptionItemWrapper} onPress={onGoFriendsPage}>
                    <View style={styles.postOptionItem}>
                        <View style={styles.optionIcon}><FontAwesome5Icon name="images" size={20}></FontAwesome5Icon></View>
                        <View>
                            <Text style={styles.postOptionTitle}>See all friends of {friend.username} </Text>
                        </View>
                    </View>
                </ExTouchableOpacity>
                <ExTouchableOpacity style={styles.postOptionItemWrapper} onPress={onGoFriendsPage}>
                    <View style={styles.postOptionItem}>
                        <View style={styles.optionIcon}><FontAwesome5Icon name="images" size={20}></FontAwesome5Icon></View>
                        <View>
                            <Text style={styles.postOptionTitle}>See all friends of {friend.username} </Text>
                        </View>
                    </View>
                </ExTouchableOpacity>
            </View>
        </View>
        </ReactNativeModal>
    )
}

const styles = StyleSheet.create({
    containerModal: {
        height: "100%",
        width: '100%',
        margin: 0,
        position: 'relative',
    },
    container: {
        height: "100%",
        width: '100%',
        position: 'relative',
    },
    backdrop: {
        height: '100%',
        width: '100%',
        zIndex: 1
    },
    postOptionsWrapper: {
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 2,
        padding: 15,
        backgroundColor: '#fff'
    },
    postOptionItemWrapper: {
        paddingBottom: 20
    },
    postOptionItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionIcon: {
        width: 30,

    },
    postOptionTitle: {
        fontSize: 16,
        textTransform: 'capitalize'
    },
    postOptionSubtitle: {
        fontSize: 12
    }
})

export default FriendOptions;