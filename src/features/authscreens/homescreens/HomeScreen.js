import React, {useEffect, useState} from 'react';
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

import {postOperations, postSelectors} from '../../../core/slice/Post';
import ScaledImage from '../../../components/ScaledImage';
import PostTool from '../../../components/PostTool';

import {Routes} from '../../../core/Routes';
import {navigation} from '../../../core/Navigation';
import {userSelectors} from '../../../core/slice/User';
import Loader from '../../../components/Loader';
import {TextInput} from 'react-native-gesture-handler';
import PostItem from '../../../components/PostItem';

const HomeScreen = () => {
    const posts = useSelector(postSelectors.getAllPosts);
    const user = useSelector(userSelectors.getUser);
    const statusContent = useSelector(postSelectors.getStatusContent);
    const dispatch = useDispatch();

    const [isReload, setIsReload] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);

    const handleReload = () => {
        if (!isReload && !isLoadMore) {
            setIsReload(true);
            dispatch(postOperations.fetchGetListPosts({reloadFlag: true})).then(() => {
                setIsReload(false);
            });
        }
    };

    const handleLoadMore = () => {
        if (!isLoadMore && !isReload && posts.length >= 9) {
            setIsLoadMore(true);
            dispatch(postOperations.fetchGetListPosts({})).then(() => {
                setTimeout(() => setIsLoadMore(false), 2000);
            });
        }
    };

    return (
        <View>
            <FlatList
                data={posts}
                ListHeaderComponent={<PostTool userAvatar={user.avatar} />}
                ListEmptyComponent={<View />}
                ListFooterComponent={() => isLoadMore && <ActivityIndicator size="large" />}
                onRefresh={handleReload}
                refreshing={isReload}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                renderItem={({item, index}) => {
                    return (
                        <PostItem
                            key={item.id}
                            index={index}
                            item={item}
                            user={user}
                            statusContent={statusContent}
                        />
                    );
                }}></FlatList>
        </View>
    );
};

export default HomeScreen;

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    countTxt: {
        fontSize: 200,
        textAlign: 'center',
        lineHeight: screenHeight - 170,
        width: '100%',
        height: screenHeight - 170,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: 'black',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        lineHeight: 50,
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});
