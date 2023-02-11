import { StyleSheet, View, Text, TextInput, Alert } from "react-native";
import ExTouchableOpacity from "../../../../components/ExTouchableOpacity";
import * as navigation from "../../../../core/Navigation";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useEffect, useState } from "react";
import { userOperations, userSelectors } from "../../../../core/slice/User";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Routes } from "../../../../core/Routes";
import { HttpStatusCode } from "axios";
import { LogicCode } from "../../../../core/Constants";

const ChangeNameScreen = () => {
    const dispatch = useDispatch();
    const goBack = () => {
        navigation.goBack();
    }

    const user = useSelector(userSelectors.getUser);

    const [username, setUserName] = useState("");

    const onSubmit = async () => {
        if(!username || username.length < 6){
            Alert.alert("User name is not valid", "You should have name more than 6 characters");
            return;
        }

        var response = await dispatch(userOperations.fetchChangeUserInfo({
            username: username,
            photo: null
        }));

        if(response.payload.data.code == LogicCode.SUCCESS){
            console.log(response.data)
            navigation.navigate(Routes.SHORTCUT_SCREEN);
        }
        else{
            console.error(response);
        }
    }

    useEffect(() => {
        setUserName(user.username);
    }, [user])

    return (<>
        <View style={styles.container}>
            <View style={styles.navigationBar}>
                <ExTouchableOpacity onPress={goBack} style={styles.btnBack}>
                    <FontAwesome5Icon name="arrow-left" size={20} />
                </ExTouchableOpacity>
                <Text style={styles.titleText}>Name</Text>
            </View>
            <View style={styles.form}>
                <View>
                    <Text>Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUserName}
                        value={username}
                    />

                    <View style={{ marginTop: 15, borderRadius: 5, backgroundColor: "#e8e8e8", paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{color: "#000000", fontWeight: 600}}>
                            Please note:
                            <Text style={{paddingLeft: 3, color: "rgba(0,0,0, 0.5)", fontWeight: 400}}>
                                If you change your name on Facebook or Instagram, you can't change it again for 60 days. Don't add any unusual capitalization, punctuation, characters, or random words.
                            </Text>
                        </Text>
                    </View>

                    <ExTouchableOpacity onPress={onSubmit} style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 15, marginTop: 10, backgroundColor: "#5d87d4", borderRadius: 5}}>
                        <Text style={{color: "#ffffff", fontWeight: 600}}>
                            Save Change
                        </Text>
                    </ExTouchableOpacity>
                </View>
            </View>
        </View>
    </>)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f0f0f0",
    },
    navigationBar: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    btnBack: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontWeight: 700,
        fontSize: 20
    },
    input: {
        height: 50,
        borderWidth: 1,
        padding: 10,
    },
    form: {
        backgroundColor: "#ffffff",
        margin: 15,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
    }
});

export default ChangeNameScreen;