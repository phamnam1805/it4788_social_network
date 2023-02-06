import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Text, Dimensions, StyleSheet} from 'react-native';
import ScaledImage from './ScaledImage';
export class Comment1 extends Component {
    render() {
        const {comment} = this.props;
        return (
            <View style={styles.container}>
                <Image style={styles.avatar} source={{uri: comment.avatar_url}}></Image>
                <View style={styles.centerContainer}>
                    <View style={styles.contentContainer}>
                        <TouchableOpacity>
                            <Text style={styles.name}>{comment.name}</Text>
                        </TouchableOpacity>
                        <Text style={styles.content}>{comment.content}</Text>
                    </View>
                    <ScaledImage
                        width={screenWidth * 0.7}
                        style={styles.image}
                        source={comment.image}></ScaledImage>
                    <View style={styles.toolContainer}>
                        <Text style={styles.createAt}>{comment.create_at}</Text>
                        <TouchableOpacity style={styles.likeBtn}>
                            <Text>Like</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.replyBtn}>
                            <Text>Reply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const Comment = ({id, comment, created, poster}) => {
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
            <Image style={styles.avatar} source={{uri: poster.avatar}}></Image>
            <View style={styles.centerContainer}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity>
                        <Text style={styles.name}>{poster.username}</Text>
                    </TouchableOpacity>
                    <Text style={styles.content}>{comment}</Text>
                </View>
                <View style={styles.toolContainer}>
                    <Text style={styles.createAt}>{convertTime(created)}</Text>
                    {/* <TouchableOpacity style={styles.likeBtn}>
                        <Text>Like</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.replyBtn}>
                        <Text>Reply</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    );
};

export default Comment;
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
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
    },
    content: {},
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
