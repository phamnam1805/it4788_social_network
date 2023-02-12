import { StyleSheet, View, Text } from "react-native";
import ExTouchableOpacity from "../../../../components/ExTouchableOpacity";
import * as navigation from "../../../../core/Navigation";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const ProfileSettingsScreen = () => {
    const goBack = () => {
        navigation.goBack();
    }

    const onOpenBlocking = () => {

    }

    return (<>
        <View style={styles.container}>
            <View style={styles.navigationBar}>
                <ExTouchableOpacity onPress={goBack} style={styles.btnBack}>
                    <FontAwesome5Icon name="arrow-left" size={20} />
                </ExTouchableOpacity>
                <Text style={styles.titleText}></Text>
            </View>
            <View style={{ marginTop: 10, paddingBottom: 20, paddingHorizontal: 15 }}>
                <View>
                    <Text style={styles.bigTitle}>Privacy</Text>
                    <Text style={styles.normalText}>Control who sees what you do on Facebook, and how data helps us personalize experiences.</Text>
                </View>
                <ExTouchableOpacity onPress={onOpenBlocking} style={styles.item}>
                    <FontAwesome5Icon style={styles.itemIcon} name="lock" />
                    <View>
                        <Text style={styles.mediumText}>Blocking</Text>
                        <Text style={styles.normalText}>Review people you previous blocked</Text>
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
    
});

export default ProfileSettingsScreen;