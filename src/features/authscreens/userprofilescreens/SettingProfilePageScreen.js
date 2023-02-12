import { Text, View, StyleSheet} from "react-native";
import * as navigation from '../../../core/Navigation';
import ExTouchableOpacity from "../../../components/ExTouchableOpacity";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { Routes } from "../../../core/Routes";

const SettingProfilePageScreen = () => {
    const goBack = ()=> {
        navigation.goBack();
    }

    const openEditProfile = () => {
        navigation.navigate(Routes.EDIT_PROFILE_SCREEN);
    }

    const openSearch = () => {
        
    }

    return (<>
        <View style={styles.container}>
            <View style={styles.navigationBar}>
                <ExTouchableOpacity onPress={goBack} style={styles.btnBack}>
                    <FontAwesome5Icon name="arrow-left" size={20} />
                </ExTouchableOpacity>
                <Text style={styles.titleText}>Profile Settings</Text>
            </View>
            <View>
                <ExTouchableOpacity onPress={openEditProfile} style={styles.item}>
                    <FontAwesome5Icon name="edit" style={styles.itemIcon}/>
                    <Text style={styles.itemText} >Edit Profile</Text>
                </ExTouchableOpacity>
                <ExTouchableOpacity style={styles.item}>
                    <FontAwesome5Icon name="search" style={styles.itemIcon}/>
                    <Text style={styles.itemText} >Search</Text>
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
    titleText : {
        fontWeight: 700,
        fontSize: 20,

    },
    item: {
        borderTopWidth: 5,
        borderBottomWidth: 5,
        borderColor: "rgba(0,0,0,0.1)",
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemIcon: {
        fontSize: 20,
        marginRight: 20
    },
    itemText: {
        fontSize: 16,
        fontWeight: 500
    }
});

export default SettingProfilePageScreen;