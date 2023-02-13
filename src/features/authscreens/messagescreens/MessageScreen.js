import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {Avatar, Text} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';

import {userSelectors} from '../../../core/slice/User';
import ChannelItem from '../../../components/ChannelItem';
import Data from './Data';

const MessageScreen = () => {
    const user = useSelector(userSelectors.getUser);
    const [channelList, setChannelList] = useState([]);

    return (
        <FlatList
            data={Data}
            keyExtractor={item => item.id}
            renderItem={ChannelItem}
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
