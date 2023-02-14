import {View, Text, Image, Dimensions} from 'react-native';
import React from 'react';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const MessageItem = ({user, message, isMe}) => {
    const bgColor = isMe ? '#D2476F' : '#4f4f4f';
    const alignment = isMe ? 'flex-end' : 'flex-start';
    const flexAlignment = isMe ? 'column' : 'row';
    const radius = isMe ? {borderTopLeftRadius: 20} : {borderBottomRightRadius: 20};
    return (
        <View
            style={{
                width: screenWidth,
                paddingHorizontal: 20,
                marginVertical: 5,
                alignItems: alignment,
                flexDirection: flexAlignment,
            }}>
            {isMe ? null : (
                <Image
                    source={{uri: message.sender.avatar}}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        marginRight: 10,
                    }}
                />
            )}
            <View
                style={{
                    maxWidth: screenWidth * 0.7,
                    backgroundColor: bgColor,
                    borderTopRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    ...radius,
                    padding: 10,
                }}>
                <Text style={{fontSize: 16, padding: 10}}>{message.message}</Text>
            </View>
        </View>
    );
};

export default MessageItem;
