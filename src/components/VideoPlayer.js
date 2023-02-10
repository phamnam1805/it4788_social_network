import {View, Text, Alert, StyleSheet} from 'react-native';
import React from 'react';
import Video from 'react-native-video';

const VideoPlayer = ({videoUri}) => {
    return (
        <View>
            {/* <Text>Video</Text> */}
            <Video
                source={{
                    uri: 'http://109.123.234.163:7000/public/uploads/video-19c3d610-2eb1-4953-85e9-ea5fcd4f6775.mp4',
                }}
                style={styles.backgroundVideo}
            />
        </View>
    );
};

export default VideoPlayer;

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
