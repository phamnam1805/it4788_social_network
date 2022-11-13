import React, {useState, useEffect, Component} from 'react';
import {ActivityIndicator, View, Text, Button, StyleSheet, Image} from 'react-native';

const Profile = ({navigation}) => {
    const onPressLearnMore = () => {
      //  navigation.navigate
    };

    return (
        <View>
            <Text>THIS IS PERSONAL PAGE</Text>
            <Button
                onPress={onPressLearnMore}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"></Button>
        </View>
    );
};

export default Profile;
