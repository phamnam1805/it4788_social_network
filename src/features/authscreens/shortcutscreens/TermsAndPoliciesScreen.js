import { View, Text, StyleSheet, Image, Linking, Alert } from "react-native";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../../../core/Navigation';
import { SCREEN_WIDTH, STATUSBAR_HEIGHT } from '../../../core/Constants';
import ExTouchableOpacity from "../../../components/ExTouchableOpacity";
import { Routes } from "../../../core/Routes";

const TermsAndPoliciesScreen = () => {
    const goBack = ()=> {
        navigation.goBack();
    }

    return (<>
        <View style={styles.container}>
            <View style={styles.navigationBar}>
                <ExTouchableOpacity onPress={goBack} style={styles.btnBack}>
                    <FontAwesome5Icon name="arrow-left" size={20} />
                </ExTouchableOpacity>
                <Text style={styles.titleText}>Terms & Policies</Text>
            </View>
            <View>
                <ExTouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/legal/terms")} style={styles.item}>
                    <FontAwesome5Icon name="book" style={styles.icon}/>
                    <View>
                        <Text style={styles.titleItemText}>
                            Terms of Service
                        </Text>
                        <Text style={styles.descriptionItemText}>
                            Terms you agree to when you use Facebook.
                        </Text>
                    </View>
                </ExTouchableOpacity>
                <ExTouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/privacy/policy/")} style={styles.item}>
                    <FontAwesome5Icon name="lock" style={styles.icon}/>
                    <View>
                        <Text style={styles.titleItemText}>
                            Privacy Policy
                        </Text>
                        <Text style={styles.descriptionItemText}>
                            information we received and how it's used
                        </Text>
                    </View>
                </ExTouchableOpacity>
                <ExTouchableOpacity onPress={() => Linking.openURL("https://transparency.fb.com/en-gb/policies/community-standards/")} style={styles.item}>
                    <FontAwesome5Icon name="home" style={styles.icon}/>
                    <View>
                        <Text style={styles.titleItemText}>
                            Community Standards
                        </Text>
                        <Text style={styles.descriptionItemText}>
                            What's not allowed and how to report abuse.
                        </Text>
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
    titleText : {
        fontWeight: 700,
        fontSize: 20
    },
    icon: {
        fontSize: 20,
        paddingTop: 5,
        marginRight: 15
    },  
    titleItemText: {
        fontSize: 16,
        fontWeight: 500
    },
    descriptionItemText: {
        fontSize: 13,
        fontWeight: 400,
        color: "rgba(0,0,0,0.5)"
    },
    item: {
        flexDirection: 'row',
        alignItems: "flex-start",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.1)"
    },
    btnBack: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default TermsAndPoliciesScreen;