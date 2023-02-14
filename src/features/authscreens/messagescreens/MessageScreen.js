import {View, StyleSheet, TouchableOpacity, FlatList, Text} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';

import {userSelectors} from '../../../core/slice/User';
import ChannelItem from '../../../components/ChannelItem';
import Data from './Data';
import {messageSelectors} from '../../../core/slice/Message';

const MessageScreen = () => {
    const conversations = useSelector(messageSelectors.getAllConversations);
    // console.log(conversations[0]);
    return (
        <FlatList
            data={conversations}
            // keyExtractor={item => item.id}
            ListEmptyComponent={<View></View>}
            renderItem={({item, index}) => {
                return <ChannelItem item={item} index={index} />;
            }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    );
};

export default MessageScreen;

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: 'lightgray',
        width: '75%',
        alignSelf: 'flex-end',
    },
});
