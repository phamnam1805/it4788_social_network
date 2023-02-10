import React, {useState} from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    RefreshControl,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import PostItem from './PostItem';

const PostList = ({posts, user, statusContent}) => {
    return (
        <>
            {posts.map((item, index) => (
                <View key={index}>
                    <PostItem
                        key={index}
                        index={index}
                        item={item}
                        user={user}
                        statusContent={statusContent}></PostItem>
                </View>
            ))}
        </>
    );
};

const MemorizedPostList = React.memo(
    PostList,
    (prevProps, nextProps) => prevProps.posts.length === nextProps.posts.length,
);

export default MemorizedPostList;
