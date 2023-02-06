/* eslint-disable react-native/no-inline-styles */
// Import React and Component
import React, {useState, createRef} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import axios from 'axios';
import {HttpStatusCode} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

import {dispatch, navigation} from '../../core/Navigation';
import {Routes} from '../../core/Routes';
import {BASE_URL} from '../../core/Constants';
import Loader from '../../components/Loader';
import {appOperations} from '../../core/slice/App';
import {useDispatch} from 'react-redux';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const [phonenumber, setPhonenumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState('');

    const passwordInputRef = createRef();

    const handleSubmitPress = () => {
        setErrorText('');
        if (!phonenumber) {
            Alert.alert('', 'Please fill Phonenumber');
            return;
        }
        if (!password) {
            Alert.alert('', 'Please fill Password');
            return;
        }

        setLoading(true);
        let requestBody = {
            phone_number: phonenumber,
            password: password,
            device_id: DeviceInfo.getUniqueId(),
        };
        console.log(requestBody);
        axios
            .post(BASE_URL + '/it4788/login', requestBody)
            .then(response => {
                if ((response.status = HttpStatusCode.Ok)) {
                    const responseData = response.data;
                    const data = responseData.data;
                    // console.log(token);
                    dispatch(
                        appOperations.login({
                            userId: data.id,
                            username: data.username,
                            token: data.token,
                            avatar: data.avatar,
                        }),
                    );
                    setLoading(false);
                } else {
                    alert('Incorrect phone number or password');
                }
            })
            .catch(error => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };
    return (
        <View style={styles.mainBody}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <View style={{alignItems: 'center'}}>
                            <Image
                                source={require('../../assets/icons/facebook.png')}
                                style={{
                                    width: '50%',
                                    height: 100,
                                    resizeMode: 'contain',
                                    margin: 30,
                                }}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={Phonenumber => setPhonenumber(Phonenumber)}
                                placeholder="Enter Phonenumber"
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="none"
                                keyboardType="phone-pad"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current && passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={Password => setPassword(Password)}
                                placeholder="Enter Password" //12345
                                placeholderTextColor="#8b9cb5"
                                keyboardType="default"
                                ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                            />
                        </View>
                        {errorText != '' ? (
                            <Text style={styles.errorTextStyle}>{errorText}</Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitPress}>
                            <Text style={styles.buttonTextStyle}>LOGIN</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.registerTextStyle}
                            onPress={() => navigation.navigate(Routes.REGISTER_SCREEN)}>
                            New Here ? Register
                        </Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#d9e9f9',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});
