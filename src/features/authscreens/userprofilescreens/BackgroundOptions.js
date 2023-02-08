import { Text, View, StyleSheet } from "react-native";
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import ReactNativeModal from "react-native-modal";

const BackgroundOptions = ({isVisible, closeModal})=> {
    const goBack = () => {
        closeModal();
    }

    const onPressSelectProfilePictureHandler = () => {

    }

    return (
        <ReactNativeModal isVisible={isVisible} style={styles.containerModal}>
            <View style={styles.container}>
            <View style={styles.backdrop}>
                <ExTouchableOpacity onPress={goBack} style={{ width: '100%', height: '100%' }}>

                </ExTouchableOpacity>
            </View>
            <View style={styles.postOptionsWrapper}>
                <ExTouchableOpacity style={styles.postOptionItemWrapper} onPress={onPressSelectProfilePictureHandler}>
                    <View style={styles.postOptionItem}>
                        <View style={styles.optionIcon}><FontAwesome5Icon name="images" size={20}></FontAwesome5Icon></View>
                        <View>
                            <Text style={styles.postOptionTitle}>View background picture</Text>
                        </View>
                    </View>
                </ExTouchableOpacity>
                <ExTouchableOpacity style={styles.postOptionItemWrapper} onPress={onPressSelectProfilePictureHandler}>
                    <View style={styles.postOptionItem}>
                        <View style={styles.optionIcon}><FontAwesome5Icon name="upload" size={20}></FontAwesome5Icon></View>
                        <View>
                            <Text style={styles.postOptionTitle}>Upload Image</Text>
                        </View>
                    </View>
                </ExTouchableOpacity>
            </View>
        </View>
        </ReactNativeModal>
    )
}

const styles = StyleSheet.create({
    containerModal: {
        height: "100%",
        width: '100%',
        margin: 0,
        position: 'relative',
    },
    container: {
        height: "100%",
        width: '100%',
        position: 'relative',
    },
    backdrop: {
        height: '100%',
        width: '100%',
        zIndex: 1
    },
    postOptionsWrapper: {
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 2,
        padding: 15,
        backgroundColor: '#fff'
    },
    postOptionItemWrapper: {
        paddingBottom: 20
    },
    postOptionItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionIcon: {
        width: 30,

    },
    postOptionTitle: {
        fontSize: 16,
        textTransform: 'capitalize'
    },
    postOptionSubtitle: {
        fontSize: 12
    }
})

export default BackgroundOptions;