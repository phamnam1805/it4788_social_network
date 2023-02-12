import UserProfileComponent from "../../../components/UserProfileComponent";
import {View, Text, StyleSheet} from 'react-native';
import * as navigation from '../../../core/Navigation';
import ExTouchableOpacity from "../../../components/ExTouchableOpacity";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const OtherProfileScreen = ({route}) => {
    
    const {userId} = route.params;

    const goBack = ()=> {
        navigation.goBack();
    }

    return (<>
        <View style={styles.container}>
            <View style={styles.navigationBar}>
                <ExTouchableOpacity onPress={goBack} style={styles.btnBack}>
                    <FontAwesome5Icon name="arrow-left" size={20} />
                </ExTouchableOpacity>
                <Text style={styles.titleText}></Text>
            </View>
            <UserProfileComponent userId={userId}/>
        </View>
    </>)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginBottom: 100
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
});

export default OtherProfileScreen;