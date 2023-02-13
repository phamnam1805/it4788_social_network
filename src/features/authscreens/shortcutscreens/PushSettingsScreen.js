import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import {useAsync} from 'react-use';
import { useEffect, useState } from 'react';
import * as navigation from '../../../core/Navigation';
import axios from 'axios';
import { BASE_URL } from '../../../core/Constants';
import { appSelectors } from '../../../core/slice/App';
import { useSelector } from 'react-redux';
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { LogicCode } from '../../../core/Constants';
import { Routes } from '../../../core/Routes';
import CheckBox from '@react-native-community/checkbox';


const PushSettingsScreen = () => {
    const [likeComment, setLikeComment] = useState(false);
    const [fromFriends, setFromFriends] = useState(false);
    const [requestedFriends, setRequestedFriends] = useState(false);
    const [suggestedFriends, setSuggesedFriends] = useState(false);
    const [report, setReport] = useState(false);
    const [soundOn, setSoundOn] = useState(false);
    const [notificationOn, setNotificationOn] = useState(false);
    const [vibrant, setVibrant] = useState(false);
    const [ledOn, setLedOn] = useState(false);

    const token = useSelector(appSelectors.getToken);

    const goBack = ()=> {
        navigation.goBack();
    }

    const pushSettings = useAsync(async () => {
        const res = await axios.post(BASE_URL + '/it4788/get_push_settings', {token: token});
        if(res.data.code == LogicCode.SUCCESS){
            var responseData = res.data.data;
            setLikeComment(responseData.like_comment);
            setFromFriends(responseData.from_friends);
            setRequestedFriends(responseData.requested_friend);
            setSuggesedFriends(responseData.suggested_friend);
            setReport(responseData.report);
            setSoundOn(responseData.sound_on);
            setNotificationOn(responseData.notification_on);
            setVibrant(responseData.vibrant_on);
            setLedOn(responseData.led_on);
        }
    }, [token])

    const onSubmit = async () => {
        const res = await axios.post(BASE_URL + '/it4788/set_push_settings', {
            token: token,
            like_comment: likeComment,
            from_friends: fromFriends,
            requested_friend: requestedFriends,
            suggested_friend: suggestedFriends,
            report: report,
            sound_on: soundOn,
            notification_on: notificationOn,
            vibrant_on: vibrant,
            led_on: ledOn
        });

        if(res.data.code == LogicCode.SUCCESS){
            Alert.alert("", "Push setting saved!")
        }
    }

    return (<>
         <View style={styles.container}>
            <View style={styles.navigationBar}>
                <ExTouchableOpacity onPress={goBack} style={styles.btnBack}>
                    <FontAwesome5Icon name="arrow-left" size={20} />
                </ExTouchableOpacity>
                <Text style={styles.titleText}>Change Push Settings</Text>
            </View>
            <View style={{marginTop: 20}}>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={likeComment}
                        onValueChange={setLikeComment}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>From Like and Comment</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={fromFriends}
                        onValueChange={setFromFriends}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>From Friends</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={requestedFriends}
                        onValueChange={setRequestedFriends}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Request Friend</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={suggestedFriends}
                        onValueChange={setSuggesedFriends}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Suggest Friend</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={report}
                        onValueChange={setReport}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Report</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={soundOn}
                        onValueChange={setSoundOn}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Sound on</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={notificationOn}
                        onValueChange={setNotificationOn}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Notification on</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={vibrant}
                        onValueChange={setVibrant}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Vibrant on</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={ledOn}
                        onValueChange={setLedOn}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Led on</Text>
                </View>
                <ExTouchableOpacity onPress={onSubmit} style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 15, marginHorizontal: 30, marginTop: 20, backgroundColor: "#5d87d4", borderRadius: 5}}>
                    <Text style={{color: "#ffffff", fontWeight: 600}}>
                        Save Change
                    </Text>
                </ExTouchableOpacity>
            </View>
        </View>
    </>)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    navigationBar: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    titleText : {
        fontWeight: 700,
        fontSize: 20
    },
    btnBack: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginHorizontal: 25
    },
    checkbox: {
        alignSelf: 'center',
    },
    label: {
        margin: 8,
        fontWeight: 500,
        fontSize: 16
    },
});

export default PushSettingsScreen;