/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {Component, useEffect, useState} from 'react';
import {
    Keyboard,
    Animated,
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Button,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    PanGestureHandler,
    State,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native-gesture-handler';
import {connect, useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import ModalSelector from 'react-native-modal-selector';

import {userSelectors} from '../../../core/slice/User';
import {Routes} from '../../../core/Routes';
import {navigation} from '../../../core/Navigation';
import {postOperations, postSelectors} from '../../../core/slice/Post';

const backGroundColor = {color: '#fff', textColor: '#000'};
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
const FullPostToolScreen = ({route}) => {
    const dispatch = useDispatch();
    const statusContent = useSelector(postSelectors.getStatusContent);
    const statusList = useSelector(postSelectors.getStatusList);

    const {selectedPhotos, selectedVideo} = route.params || {};

    const [photos, setPhotos] = useState(selectedPhotos);
    const [video, setVideo] = useState(selectedVideo);
    const [content, setContent] = useState('');

    const [selectedStatus, setSelectedStatus] = useState('');

    const user = useSelector(userSelectors.getUser);

    const onPressGoBackHandler = () => {
        navigation.goBack();
    };

    const onSharePhotoPressHandler = () => {
        var options = {
            mediaType: 'photo',
            selectionLimit: 4,
        };
        launchImageLibrary(options, res => {
            console.log('Response = ', res);
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.assets) {
                const photos = res.assets;
                if (photos.length > 4) {
                    Alert.alert('', 'Please choose maximum 4 photos');
                } else {
                    setPhotos(photos);
                }
            } else {
            }
        });
    };

    const onShareVideoPressHandler = () => {
        var options = {
            mediaType: 'video',
            selectionLimit: 1,
        };
        launchImageLibrary(options, res => {
            console.log('Response = ', res);
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.assets) {
                const video = res.assets;
                if (video.length > 1) {
                    Alert.alert('', 'Please choose maximum 1 video');
                } else {
                    setVideo(video[0]);
                }
            } else {
            }
        });
    };

    const onPostPressHandler = () => {
        // console.log(photos);
        let status = null;
        if (selectedStatus && selectedStatus !== 'nothing') {
            status = selectedStatus;
        }
        if (!content && !photos && !video && !status) {
            Alert.alert('', 'Please enter something');
        } else {
            dispatch(
                postOperations.fetchAddPost({
                    content: content,
                    status: status,
                    photos: photos,
                    video: video,
                }),
            );
            navigation.navigate(Routes.HOME_SCREEN);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.parentContainer}
            enabled
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <SafeAreaView style={styles.container}>
                <View style={styles.navigationBar}>
                    <TouchableOpacity
                        onPress={onPressGoBackHandler.bind(this)}
                        style={styles.naviIcon}>
                        <FontAwesome5Icon
                            color="#000"
                            name="arrow-left"
                            size={20}></FontAwesome5Icon>
                    </TouchableOpacity>
                    <Text style={styles.naviTitle}>Create a post</Text>
                    <TouchableOpacity
                        onPress={onPostPressHandler}
                        style={styles.btnPost}
                        disabled={
                            !content &&
                            !photos &&
                            !video &&
                            !(selectedStatus && selectedStatus !== 'nothing'
                                ? selectedStatus
                                : null)
                        }>
                        <Text style={{fontSize: 16}}>POST</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoWrapper}>
                    <Image style={styles.avatar} source={{uri: user.avatar}}></Image>
                    <View>
                        <View style={styles.nameWrapper}>
                            <Text style={styles.name}>{user.username}</Text>
                            {selectedStatus && selectedStatus !== 'nothing' ? (
                                <>
                                    <Text style={styles.name}>
                                        {' is ' + statusContent[selectedStatus]}
                                    </Text>
                                    <MaterialCommunityIcon
                                        size={30}
                                        name={selectedStatus}
                                        // style={styles.optionImage}
                                        color="#bd9cf1"
                                    />
                                </>
                            ) : (
                                <></>
                            )}
                        </View>

                        <View style={styles.areaWrapper}>
                            <TouchableOpacity style={styles.areaOption}>
                                <FontAwesome5Icon
                                    style={{marginRight: 3}}
                                    name="globe-asia"
                                    size={14}>
                                    {' '}
                                </FontAwesome5Icon>
                                <Text>Public</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        ...styles.editorWrapper,
                        backgroundColor: backGroundColor.color,
                    }}>
                    <View
                        style={{
                            alignSelf: 'stretch',
                            width: '100%',
                            justifyContent: 'center',
                        }}>
                        <TextInput
                            placeholderTextColor={backGroundColor.textColor}
                            placeholder="What's on your mind?"
                            onChangeText={content => setContent(content)}
                            multiline
                            style={{
                                ...styles.editor,
                                fontSize: 26,
                                textAlign: 'center',
                                color: backGroundColor.textColor,
                                fontWeight: 'bold',
                            }}></TextInput>
                    </View>
                </View>
            </SafeAreaView>

            <View style={styles.toolOptionsWrapper}>
                <TouchableWithoutFeedback>
                    <View style={styles.optionTitle}>
                        <Text style={{fontSize: 16}}>Add to your post</Text>
                        <View style={styles.optionImagesWrapper}>
                            <TouchableOpacity
                                disabled={video ? true : false}
                                onPress={onSharePhotoPressHandler}>
                                <FontAwesomeIcon
                                    size={24}
                                    name="file-image-o"
                                    style={styles.optionImage}
                                    color={!video ? '#318bfb' : '#ddd'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={photos ? true : false}
                                onPress={onShareVideoPressHandler}>
                                <FontAwesomeIcon
                                    size={24}
                                    name="file-video-o"
                                    style={styles.optionImage}
                                    color={!photos ? '#318bfb' : '#ddd'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.selector.open()}>
                                <ModalSelector
                                    // disabled={isModalDisable}
                                    data={statusList}
                                    initValue="What are you feeling?"
                                    supportedOrientations={['landscape']}
                                    accessible={true}
                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                    cancelButtonAccessibilityLabel={'Cancel Button'}
                                    ref={selector => {
                                        this.selector = selector;
                                    }}
                                    onChange={option => {
                                        setSelectedStatus(option.key);
                                    }}
                                    customSelector={
                                        <MaterialCommunityIcon
                                            size={24}
                                            name="emoticon-outline"
                                            style={styles.optionImage}
                                            color="#318bfb"
                                        />
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </KeyboardAvoidingView>
    );
};

export default FullPostToolScreen;

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    parentContainer: {
        paddingTop: 5,
        paddingBottom: 15,
        height: screenHeight,
        position: 'relative',
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        flex: 1,
    },
    navigationBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        height: 50,
    },
    naviIcon: {
        padding: 10,
    },
    naviTitle: {
        paddingHorizontal: 10,
        fontSize: 18,
    },
    btnPost: {
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
    },
    infoWrapper: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    areaWrapper: {
        flexDirection: 'row',
    },
    areaOption: {
        marginRight: 10,
        paddingHorizontal: 5,
        paddingVertical: 2.5,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        marginRight: 10,
        borderRadius: 50,
        width: 40,
        height: 40,
    },
    nameWrapper: {
        flexDirection: 'row',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    editorWrapper: {
        overflow: 'hidden',
        padding: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: '60%',
    },
    editor: {
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    toolOptionsWrapper: {
        position: 'relative',
        bottom: 0,
        left: 0,
        width: '100%',
        paddingBottom: 10,
        backgroundColor: '#fff',
        // height: '10%',
    },
    optionTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 55,
        alignItems: 'center',
        borderTopColor: '#ddd',
        borderTopWidth: 1,
    },
    optionImagesWrapper: {
        flexDirection: 'row',
    },
    optionImage: {
        // backgroundColor: '#000',
        padding: 2,
        height: 35,
        width: 45,
    },
});
