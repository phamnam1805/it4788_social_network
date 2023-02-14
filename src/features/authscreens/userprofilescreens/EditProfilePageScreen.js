import {Text, View, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import * as navigation from '../../../core/Navigation';
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {userSelectors, userOperations} from '../../../core/slice/User';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {LogicCode} from '../../../core/Constants';
import {Routes} from '../../../core/Routes';
import prompt from 'react-native-prompt-android';

const EditProfilePageScreen = () => {
    const user = useSelector(userSelectors.getUser);
    const dispatch = useDispatch();

    const goBack = () => {
        navigation.goBack();
    };

    const editProfilePicture = () => {
        var options = {
            mediaType: 'photo',
            selectionLimit: 1,
        };
        launchImageLibrary(options, async res => {
            console.log('Response = ', res);
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.assets) {
                const photos = res.assets;
                if (photos.length > 1) {
                    Alert.alert('', 'Please choose maximum 1 photo');
                } else {
                    var photo = photos[0];
                    var response = await dispatch(
                        userOperations.fetchChangeUserInfo({
                            username: user.username,
                            photo: photo,
                        }),
                    );

                    if (response.payload.data.code == LogicCode.SUCCESS) {
                        navigation.navigate(Routes.EDIT_PROFILE_SCREEN);
                    } else {
                        // console.error(response);
                    }
                }
            } else {
            }
        });
    };

    const editCoverPicture = () => {
        var options = {
            mediaType: 'photo',
            selectionLimit: 1,
        };
        launchImageLibrary(options, async res => {
            console.log('Response = ', res);
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.assets) {
                const photos = res.assets;
                if (photos.length > 1) {
                    Alert.alert('', 'Please choose maximum 1 photo');
                } else {
                    var photo = photos[0];
                    var response = await dispatch(
                        userOperations.fetchChangeUserInfo({
                            username: user.username,
                            background: photo,
                        }),
                    );

                    if (response.payload.data.code == LogicCode.SUCCESS) {
                        navigation.navigate(Routes.EDIT_PROFILE_SCREEN);
                    } else {
                        // console.error(response);
                    }
                }
            } else {
            }
        });
    };

    const updateAddress = async address => {
        var response = await dispatch(
            userOperations.fetchChangeUserInfo({
                address: address,
            }),
        );

        if (response.payload.data.code == LogicCode.SUCCESS) {
            navigation.navigate(Routes.EDIT_PROFILE_SCREEN);
        } else {
            // console.error(response);
        }
    };

    const editAddress = () => {
        prompt(
            'Change Address',
            'Change your address',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel is pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Submit',
                    onPress: address => updateAddress(address),
                },
            ],
            {
                type: 'default',
                cancelable: true,
                placeholder: 'Address',
            },
        );
    };

    const updateDescription = async description => {
        var response = await dispatch(
            userOperations.fetchChangeUserInfo({
                description: description,
            }),
        );

        if (response.payload.data.code == LogicCode.SUCCESS) {
            navigation.navigate(Routes.EDIT_PROFILE_SCREEN);
        } else {
            // console.error(response);
        }
    };

    const editDescription = () => {
        prompt(
            'Change Description',
            'Change your discription',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel is pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Submit',
                    onPress: description => updateDescription(description),
                },
            ],
            {
                type: 'default',
                cancelable: true,
                placeholder: 'Description',
            },
        );
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.navigationBar}>
                    <ExTouchableOpacity onPress={goBack} style={styles.btnBack}>
                        <FontAwesome5Icon name="arrow-left" size={20} />
                    </ExTouchableOpacity>
                    <Text style={styles.titleText}>Edit Profile</Text>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{marginHorizontal: 20, marginBottom: 50}}>
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>ProfilePicture</Text>
                            <ExTouchableOpacity onPress={editProfilePicture}>
                                <Text style={styles.sectionEditButton}>Edit</Text>
                            </ExTouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Image style={styles.avatar} source={{uri: user.avatar}} />
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Cover Photo</Text>
                            <ExTouchableOpacity onPress={editCoverPicture}>
                                <Text style={styles.sectionEditButton}>Edit</Text>
                            </ExTouchableOpacity>
                        </View>
                        <View
                            style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                            <Image style={styles.cover} source={{uri: user.cover}} />
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Bio</Text>
                            <ExTouchableOpacity onPress={editDescription}>
                                <Text style={styles.sectionEditButton}>Edit</Text>
                            </ExTouchableOpacity>
                        </View>
                        <View
                            style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                            <Text>{user.description ? user.description : 'Empty Bio'}</Text>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Address</Text>
                            <ExTouchableOpacity onPress={editAddress}>
                                <Text style={styles.sectionEditButton}>Edit</Text>
                            </ExTouchableOpacity>
                        </View>
                        {user.address ? (
                            <>
                                <View style={styles.introListWrapper}>
                                    <View style={styles.introLine}>
                                        <FontAwesome5Icon
                                            size={20}
                                            color="#333"
                                            style={styles.introIcon}
                                            name="home"
                                        />
                                        <Text style={styles.introLineText}>
                                            Live in{' '}
                                            <Text style={styles.introHightLight}>
                                                {user.address}
                                            </Text>
                                        </Text>
                                    </View>
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={styles.introListWrapper}>
                                    <View style={styles.introLine}>
                                        <FontAwesome5Icon
                                            size={20}
                                            color="#333"
                                            style={styles.introIcon}
                                            name="home"
                                        />
                                        <Text style={styles.introLineText}>No Information</Text>
                                    </View>
                                </View>
                            </>
                        )}
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    navigationBar: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    btnBack: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontWeight: 700,
        fontSize: 20,
    },
    section: {
        paddingVertical: 15,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 700,
    },
    sectionEditButton: {
        color: 'blue',
        fontSize: 15,
        fontWeight: 500,
    },
    avatar: {
        height: 180,
        width: 180,
        borderRadius: 2000,
        borderColor: '#fff',
        borderWidth: 5,
    },
    cover: {
        width: '100%',
        flex: 1,
        height: undefined,
        aspectRatio: 3 / 2,
    },
    introListWrapper: {
        paddingVertical: 10,
    },
    introLine: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    introIcon: {
        width: 30,
    },
    introLineText: {
        fontSize: 16,
        fontWeight: '400',
    },
    introHightLight: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default EditProfilePageScreen;
