import { StyleSheet, View, Text, Image } from "react-native";
import ExTouchableOpacity from "../../../../components/ExTouchableOpacity";
import * as navigation from "../../../../core/Navigation";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { userSelectors } from "../../../../core/slice/User";
import { useSelector } from "react-redux";
import { Routes } from "../../../../core/Routes";

const SettingsScreen = () => {
    const user = useSelector(userSelectors.getUser);

    const goBack = () => {
        navigation.goBack();
    }

    const onOpenPersonalInformation = () => {
        navigation.navigate(Routes.PERSONAL_INFORMATION_SCREEN);
    }

    const onOpenProfileSetting = () => {
        navigation.navigate(Routes.PROFILE_SETTINGS_SCREEN);
    }

    return (<>
        <View style={styles.container}>
            <View style={styles.navigationBar}>
                <ExTouchableOpacity onPress={goBack} style={styles.btnBack}>
                    <FontAwesome5Icon name="arrow-left" size={20} />
                </ExTouchableOpacity>
                <Text style={styles.titleText}></Text>
            </View>
            <View style={{paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 7, borderColor: "rgba(0,0,0,0.1)"}}>
                <View>
                    <Text style={styles.bigTitle}>Profile</Text>
                    <Text style={styles.normalText}>Control preferences for this profile like privacy. notifications and other settings.</Text>
                </View>
                <ExTouchableOpacity onPress={onOpenProfileSetting}>
                    <View style={styles.infoWrapper}>
                        <Image style={styles.avatar} source={{uri: user.avatar}}></Image>
                        <View>
                            <Text style={styles.mediumText}>Profile settings</Text>
                            <Text style={styles.normalText}>For {user.username}</Text>
                        </View>
                    </View>
                </ExTouchableOpacity>
            </View>
            <View style={{ marginTop: 10, paddingBottom: 20, paddingHorizontal: 15 }}>
                <View>
                    <Text style={styles.bigTitle}>Account</Text>
                    <Text style={styles.normalText}>Manage settings related to permissions, ads, Off-Facebook activity and other account information</Text>
                </View>
                <ExTouchableOpacity onPress={onOpenPersonalInformation} style={styles.item}>
                    <FontAwesome5Icon style={styles.itemIcon} name="user" />
                    <View>
                        <Text style={styles.mediumText}>Personal Information</Text>
                        <Text style={styles.normalText}>Update your name and contact information connected to your Facebook account.</Text>
                    </View>
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
    btnBack: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bigTitle: {
        fontSize: 21,
        fontWeight: 600,
        color: "#000"
    },
    mediumText: {
        fontSize: 17,
        fontWeight: 500,
        color: "rgba(0,0,0,0.8)"
    },
    normalText: {
        fontSize: 15,
        fontWeight: 400,
        color: "rgba(0,0,0,0.7)"
    },
    infoWrapper: {
        marginTop: 10,
        flexDirection: 'row'
    },
    item: {
        marginTop: 10,
        flexDirection: 'row'
    },
    itemIcon: {
        fontSize: 25,
        marginRight: 20
    },
    avatar:{
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 50
    }
});

export default SettingsScreen;