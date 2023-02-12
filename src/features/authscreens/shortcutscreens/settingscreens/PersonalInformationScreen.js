import { StyleSheet, View, Text } from "react-native";
import ExTouchableOpacity from "../../../../components/ExTouchableOpacity";
import * as navigation from "../../../../core/Navigation";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from "react-redux";
import { userSelectors } from "../../../../core/slice/User";
import { Routes } from "../../../../core/Routes";

const PersonalInformationScreen = () => {

    const user = useSelector(userSelectors.getUser);

    const goBack = () => {
        navigation.goBack();
    }

    const onOpenChangeName = () => {
        navigation.navigate(Routes.CHANGE_NAME_SCREEN);
    }

    return (<>
        <View style={styles.container}>
            <View style={styles.navigationBar}>
                <ExTouchableOpacity onPress={goBack} style={styles.btnBack}>
                    <FontAwesome5Icon name="arrow-left" size={20} />
                </ExTouchableOpacity>
                <Text style={styles.titleText}></Text>
            </View>
            <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
                <Text style={{fontSize: 21, fontWeight: 600}}>Personal information</Text>
                <Text style={{fontSize: 20, fontWeight: 600, marginTop: 20}}>General</Text>
                <View>
                    <ExTouchableOpacity onPress={onOpenChangeName}  style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={styles.infoWrapper}>
                            <FontAwesome5Icon style={styles.infoIcon} name="address-card"/>
                            <View>
                                <Text style={{fontSize: 16}}>Name</Text>
                                <Text>{user.username}</Text>
                            </View>
                        </View>
                        <FontAwesome5Icon name="chevron-right" size={16} />
                    </ExTouchableOpacity>
                </View>
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
    infoWrapper: {
        flexDirection: 'row',
    },
    infoIcon: {
        fontSize: 28,
        marginRight: 10
    }
});

export default PersonalInformationScreen;