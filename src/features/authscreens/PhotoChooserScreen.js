import React, {Component, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';

const PhotoChooserScreen = () => {
    const [selectedIndexes, setSelectedIndexes] = useState([]);

    const selectFile = () => {
        const launchImageLibraryOptions = {
            title: 'Select Image',
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(launchImageLibraryOptions, res => {});
    };
    return (
        <View>
            <Text>PhotoChooserScreen</Text>
        </View>
    );
};

export default PhotoChooserScreen;
