import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Text, Dimensions, StyleSheet} from 'react-native';
import ScaledImage from './ScaledImage';

const CommentItem = ({comment}) => {
    const convertTime = time => {
        const preViousDate = new Date(time);
        const previousTimestamp = preViousDate.getTime();
        const nowTimestamp = Date.now();

        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerWeek = msPerDay * 7;
        const msPerMonth = msPerDay * 30;
        const msPerYear = msPerDay * 365;

        const elapsed = nowTimestamp - previousTimestamp;
        if (elapsed < msPerMinute) {
            return 'Just now';
        } else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        } else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        } else if (elapsed < msPerWeek) {
            return Math.round(elapsed / msPerDay) + ' days ago';
        } else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerWeek) + ' weeks ago';
        } else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' months ago';
        } else {
            return Math.round(elapsed / msPerYear) + ' years ago';
        }
    };
    return (
        <View style={styles.container}>
            <Image style={styles.avatar} source={{uri: comment.poster.avatar}}></Image>
            <View style={styles.centerContainer}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity>
                        <Text style={{...styles.name, ...styles.textContent}}>
                            {comment.poster.username}
                        </Text>
                    </TouchableOpacity>
                    <Text style={{...styles.content, ...styles.textContent}}>
                        {comment.comment}
                    </Text>
                </View>
                <View style={styles.toolContainer}>
                    <Text style={{...styles.createAt, ...styles.textContent}}>
                        {convertTime(comment.created)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default CommentItem;
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    textContent: {color: '#000'},
    container: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 10,
    },
    centerContainer: {
        width: screenWidth * 0.7,
    },
    contentContainer: {
        marginBottom: 10,
        padding: 10,
        paddingTop: 5,
        backgroundColor: '#e9ebee',
        borderRadius: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    content: {
        fontSize: 16,
    },
    image: {
        borderRadius: 10,
    },
    toolContainer: {
        marginTop: 5,
        flexDirection: 'row',
        width: 0.6 * screenWidth,
    },
    createAt: {
        flex: 1,
    },
    likeBtn: {
        textAlign: 'center',
        flex: 1,
    },
    replyBtn: {
        textAlign: 'center',
        flex: 1,
    },
});
