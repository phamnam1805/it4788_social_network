import { View, Text, StyleSheet } from "react-native";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../../../core/Navigation';
import { SCREEN_WIDTH, STATUSBAR_HEIGHT } from '../../../core/Constants';
import ExTouchableOpacity from "../../../components/ExTouchableOpacity";

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
            </View>
            <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                <Text>
                    Terms And Policies Of Facebook.
                </Text>
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
    }
})


export default TermsAndPoliciesScreen;