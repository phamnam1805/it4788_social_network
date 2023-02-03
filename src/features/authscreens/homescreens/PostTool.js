import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TextInput, TouchableOpacity} from 'react-native';
import FontAweSome5 from 'react-native-vector-icons/FontAwesome5';

import {Routes} from '../../../core/Routes';
import {navigation} from '../../../core/Navigation';

const PostTool = ({userAvatar}) => {
    const onPhotoUploaderPressHandler = () => {
        navigation.navigate('PhotoChooser');
    };
    const onVideoUploaderPressHandler = () => {};
    const onFullPostToolPressHandler = () => {
        navigation.navigate(Routes.FULL_POST_TOOL_SCREEN);
    };

    return (
        <View style={styles.container}>
            <View style={styles.postToolWrapper}>
                <TouchableOpacity activeOpacity={0.5} style={styles.userAvatarWrapper}>
                    <Image source={{uri: userAvatar}} style={styles.userAvatar}></Image>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onFullPostToolPressHandler}
                    style={styles.postInputWrapper}>
                    <View style={{...styles.postInput}}>
                        <Text>What's on your mind?</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.postOptionsWrapper}>
                {/* <TouchableOpacity
                    onPress={onFullPostToolPressHandler}
                    activeOpacity={0.5}
                    style={styles.postOptionItemWrapper}>
                    <View style={{...styles.postOptionItem, ...styles.postOptionItemMiddle}}>
                        <FontAweSome5
                            style={styles.postOptionIcon}
                            name="edit"
                            color="green"
                            size={16}
                        />
                        <Text>Write a post</Text>
                    </View>
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={onPhotoUploaderPressHandler.bind(this)}
                    activeOpacity={0.5}
                    style={styles.postOptionItemWrapper}>
                    <View style={styles.postOptionItem}>
                        <FontAweSome5
                            style={styles.postOptionIcon}
                            name="image"
                            color="red"
                            size={16}
                        />
                        <Text>Share Photos</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onVideoUploaderPressHandler.bind(this)}
                    activeOpacity={0.5}
                    style={styles.postOptionItemWrapper}>
                    <View style={styles.postOptionItem}>
                        <FontAweSome5
                            style={styles.postOptionIcon}
                            name="video"
                            color="red"
                            size={16}
                        />
                        <Text>Share video</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PostTool;

const styles = StyleSheet.create({
    container: {
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginTop: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    postToolWrapper: {
        padding: 10,
        flexDirection: 'row',
    },
    postOptionsWrapper: {
        flexDirection: 'row',
        height: 40,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        alignItems: 'center',
    },
    postOptionItemWrapper: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
    },
    postOptionItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    postOptionItemMiddle: {
        borderRightColor: '#ddd',
        borderRightWidth: 1,
        borderLeftColor: '#ddd',
        borderLeftWidth: 1,
    },
    postOptionIcon: {
        marginRight: 5,
    },
    postInputWrapper: {
        borderRadius: 48,
        flex: 1,
        marginLeft: 5,
    },
    postInput: {
        justifyContent: 'center',
        borderRadius: 48,
        height: 40,
        width: '100%',
        borderColor: '#ddd',
        paddingHorizontal: 10,
        borderWidth: 1,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    userAvatarWrapper: {},
});
