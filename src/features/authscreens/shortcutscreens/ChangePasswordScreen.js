import { View, Text, StyleSheet, ScrollView, Image, TextInput, Alert } from 'react-native';
import {useAsync} from 'react-use';
import { useState } from 'react';
import * as navigation from '../../../core/Navigation';
import axios from 'axios';
import { BASE_URL } from '../../../core/Constants';
import { appSelectors, appOperations } from '../../../core/slice/App';
import { useSelector } from 'react-redux';
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { LogicCode } from '../../../core/Constants';
import { Routes } from '../../../core/Routes';
import { useDispatch } from 'react-redux';

const ChangePasswordScreen = () => {

    const dispatch = useDispatch();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const token = useSelector(appSelectors.getToken);

    const goBack = ()=> {
        navigation.goBack();
    }

    const onSubmit = async () => {
        if (!oldPassword) {
            Alert.alert('', 'Please fill Old Password');
            return;
        }
        if (!newPassword) {
            Alert.alert('', 'Please fill New Password');
            return;
        }
        if (!confirmPassword) {
            Alert.alert('', 'Please fill Confirm Password');
            return;
        }
        if (confirmPassword != newPassword) {
            Alert.alert('', 'Please retype the same password');
            return;
        }

        const res = await axios.post(BASE_URL + '/it4788/change_password', {
            token: token,
            password: oldPassword,
            new_password: newPassword
        });
        
        if(res.data.code == LogicCode.SUCCESS){
            dispatch(appOperations.logout())
        }
        else{
            Alert.alert("", "Old password is not valid!")
        }
    }

    return (<>
         <View style={styles.container}>
            <View style={styles.navigationBar}>
                <ExTouchableOpacity onPress={goBack} style={styles.btnBack}>
                    <FontAwesome5Icon name="arrow-left" size={20} />
                </ExTouchableOpacity>
                <Text style={styles.titleText}>Change password</Text>
            </View>
            <View style={styles.form}>
                <Text style={{fontWeight: 500, fontSize: 16, marginTop: 10}}>Old Password</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={setOldPassword}
                    value={oldPassword}
                />
                <Text style={{fontWeight: 500, fontSize: 16, marginTop: 10}}>New Password</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={setNewPassword}
                    value={newPassword}
                />
                <Text style={{fontWeight: 500, fontSize: 16, marginTop: 10}}>Confirm Password</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                />
                <ExTouchableOpacity onPress={onSubmit} style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 15, marginTop: 20, backgroundColor: "#5d87d4", borderRadius: 5}}>
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
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
    form: {
        marginHorizontal: 20,
        marginVertical: 20
    }
});

export default ChangePasswordScreen;