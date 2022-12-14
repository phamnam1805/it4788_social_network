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
    Button,
    Alert,
} from 'react-native';
import Prompt from 'react-native-single-prompt';

import Loader from './components/Loader';

const RegisterScreen = props => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
    const [isPromptActive, setIsPromptActive] = useState(false);

    const emailInputRef = createRef();
    const passwordInputRef = createRef();
    const retypePasswordInputRef = createRef();

    const handleSubmitButton = () => {
        setErrorText('');
        if (!name) {
            alert('Please fill Name');
            return;
        }
        if (!email) {
            alert('Please fill Email');
            return;
        }
        if (!password) {
            alert('Please fill Password');
            return;
        }
        if (!retypePassword) {
            alert('Please fill Retype Password');
            return;
        }
        if (retypePassword != password) {
            alert('Please retype the same password');
            return;
        }
        //Show Loader
        setLoading(true);
        var dataToSend = {
            name: name,
            email: email,
            password: password,
        };
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        // fetch('http://localhost:3000/api/user/register', {
        //     method: 'POST',
        //     body: formBody,
        //     headers: {
        //         //Header Defination
        //         'Content-Type':
        //             'application/x-www-form-urlencoded;charset=UTF-8',
        //     },
        // })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         //Hide Loader
        //         setLoading(false);
        //         console.log(responseJson);
        //         // If server response message same as Data Matched
        //         if (responseJson.status === 'success') {
        //             setIsRegistrationSuccess(true);
        //             console.log(
        //                 'Registration Successful. Please Login to proceed'
        //             );
        //         } else {
        //             setErrorText(responseJson.msg);
        //         }
        //     })
        //     .catch((error) => {
        //         //Hide Loader
        //         setLoading(false);
        //         console.error(error);
        //     });
        if (true) {
            setLoading(false);
            setIsPromptActive(true);
            console.log(formBody);
            console.log('Register success');
            //   setIsRegistrationSuccess(true);
        }
    };
    const HandleSubmitVerificationCode = code => {
        if (false) {
            console.log('Verify success ', code);
            Alert.alert('Success', 'Register success', [
                {
                    text: 'OK',
                    onPress: () => {
                        setIsPromptActive(false);
                        setIsRegistrationSuccess(true);
                    },
                },
            ]);
        } else {
            console.log('Verify failed');
            Alert.alert('Failed', 'Register failed', [{text: 'OK'}]);
        }
    };
    if (isPromptActive) {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Modal transparent={true} visible={isPromptActive} animationType="fade">
                    <Prompt
                        exit={() => setIsPromptActive(false)}
                        submit={code => HandleSubmitVerificationCode(code)}
                        name="Verification"
                        placeholder="Enter Verification Code"
                    />
                </Modal>
            </SafeAreaView>
        );
    }
    if (isRegistrationSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#d9e9f9',
                    justifyContent: 'center',
                }}>
                <Image
                    source={require('../assets/icons/success.png')}
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
                    onPress={() => props.navigation.navigate('LoginScreen')}>
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
                        source={require('../assets/icons/facebook.png')}
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
                            onChangeText={Name => setName(Name)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Name"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                emailInputRef.current && emailInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={Email => setEmail(Email)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Email"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="email-address"
                            ref={emailInputRef}
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
