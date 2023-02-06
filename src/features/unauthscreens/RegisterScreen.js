/* eslint-disable react-native/no-inline-styles */
// Import React and Component
import React, {useState, createRef} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    Modal,
    SafeAreaView,
    Alert,
} from 'react-native';
import prompt from 'react-native-prompt-android';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import {HttpStatusCode} from 'axios';

import {Routes} from '../../core/Routes';
import {navigation} from '../../core/Navigation';
import {BASE_URL, LogicCode} from '../../core/Constants';
import Loader from '../../components/Loader';

const RegisterScreen = props => {
    let phonenumberForVerification = '';
    const [phonenumber, setPhonenumber] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

    const phonenumberInputRef = createRef();
    const passwordInputRef = createRef();
    const retypePasswordInputRef = createRef();

    const isPhoneNumber = (phoneNumber) => {
        return (phoneNumber.search(/0{1}/) == 0)
            && (phoneNumber.match(/^\d{10}$/) != null);
    }

    const handleSubmitButton = () => {
        setErrorText('');
        if (!phonenumber) {
            Alert.alert('', 'Please fill Phonenumber');
            return;
        }
        if(!isPhoneNumber(phonenumber)){
            Alert.alert('', 'Phone number is invalid');
            return;
        }
        if (!password) {
            Alert.alert('', 'Please fill Password');
            return;
        }
        if (!retypePassword) {
            Alert.alert('', 'Please fill Retype Password');
            return;
        }
        if (retypePassword != password) {
            Alert.alert('', 'Please retype the same password');
            return;
        }
        //Show Loader
        // setLoading(true);
        phonenumberForVerification = phonenumber;
        var requestBody = {
            phone_number: phonenumber,
            password: password,
        };

        axios
            .post(BASE_URL + '/it4788/signup', requestBody)
            .then(response => {
                setLoading(false);
                const responseData = response.data;
                // console.log(responseData);
                if (response.status === HttpStatusCode.Ok) {
                    if (responseData.code == LogicCode.USER_EXISTED){
                        Alert.alert('', 'The user is already existed!');
                    }
                    else if(responseData.code == LogicCode.SUCCESS){
                        prompt(
                            'Verification register',
                            'Enter your verification code',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log('Cancel is pressed'),
                                    style: 'cancel',
                                },
                                {text: 'Submit', onPress: code => HandleSubmitVerificationCode(code)},
                            ],
                            {
                                type: 'phone-pad',
                                // type: 'secure-text',
                                cancelable: true,
                                placeholder: 'verification code',
                                // keyboardType: 'phone-pad',
                            },
                        );
                    }
                    else if(responseData.code == LogicCode.PARAMETER_VALUE_IS_INVALID){
                        Alert.alert('', 'The phone number is invalid!');
                    }
                }
                else if(response.status === HttpStatusCode.BadRequest){
                    Alert.alert('', 'Bad Request!');
                }
                else if(response.status === HttpStatusCode.NotFound){
                    Alert.alert('', 'Not found!');
                }

                console.log("GO HERE TOO");
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    };
    const HandleSubmitVerificationCode = code => {
        var requestBody = {
            phone_number: phonenumberForVerification,
            verify_code: code,
        };
        // console.log(requestBody);
        axios
            .post(BASE_URL + '/it4788/check_verify_code', requestBody)
            .then(response => {
                if (response.status === HttpStatusCode.Ok) {
                    Alert.alert('Success', 'Register success', [
                        {
                            text: 'OK',
                            onPress: () => {
                                setIsRegistrationSuccess(true);
                            },
                        },
                    ]);
                } else {
                    Alert.alert('Failed', 'Register failed', [
                        {
                            text: 'OK',
                            onPress: () => {
                                setIsRegistrationSuccess(false);
                            },
                        },
                    ]);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    if (isRegistrationSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#d9e9f9',
                    justifyContent: 'center',
                }}>
                <Image
                    source={require('../../assets/icons/success.png')}
                    style={{
                        height: 150,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                    }}
                />
                <Text style={styles.successTextStyle}>Registration Successful</Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate(Routes.LOGIN_SCREEN)}>
                    <Text style={styles.buttonTextStyle}>Login Now</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={{flex: 1, backgroundColor: '#d9e9f9'}}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
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
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={Phonenumber => setPhonenumber(Phonenumber)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Phonenumber"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="phone-pad"
                            ref={phonenumberInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                passwordInputRef.current && passwordInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={Password => setPassword(Password)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Password"
                            placeholderTextColor="#8b9cb5"
                            ref={passwordInputRef}
                            returnKeyType="next"
                            secureTextEntry={true}
                            onSubmitEditing={() =>
                                retypePasswordInputRef.current &&
                                retypePasswordInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={RetypePassword => setRetypePassword(RetypePassword)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Retype Password"
                            placeholderTextColor="#8b9cb5"
                            ref={retypePasswordInputRef}
                            returnKeyType="next"
                            secureTextEntry={true}
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    {errorText != '' ? (
                        <Text style={styles.errorTextStyle}>{errorText}</Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>REGISTER</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
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
        marginBottom: 20,
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
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d3dde8',
    },
});
