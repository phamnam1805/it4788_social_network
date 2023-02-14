import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    FlatList,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {appSelectors} from '../../../core/slice/App';
import {userSelectors} from '../../../core/slice/User';
import {messageApi} from '../../../core/slice/Message';
import {useAsync} from 'react-use';
import {navigation} from '../../../core/Navigation';
import MessageItem from '../../../components/ProfilePosts/MessageItem';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

const ChannelScreen = ({route}) => {
    const {index, conversationId, partner} = route.params || {};
    const [lastIndex, setLastIndex] = useState(0);
    const [messages, setMessages] = useState([]);
    const token = useSelector(appSelectors.getToken);
    const userId = useSelector(appSelectors.getUserId);
    const user = useSelector(userSelectors.getUser);
    const [messageContent, setMessageContent] = useState('');
    const textInputRef = React.createRef();
    const [isLoadMore, setIsLoadMore] = useState(false);

    const onSendPressHandler = () => {};

    const fetchMessage = async pageIndex => {
        const response = await messageApi.getConversation(
            token,
            null,
            conversationId,
            pageIndex,
            10,
        );
        return response.data.data.conversation;
    };

    useAsync(async () => {
        const tmp = await fetchMessage(0);
        setLastIndex(1);
        setMessages(tmp);
    }, []);

    const handleLoadMore = async () => {
        if (!isLoadMore) {
            setIsLoadMore(true);
            const tmp = await fetchMessage(lastIndex);
            setLastIndex(lastIndex + 1);
            console.log(tmp);
            setMessages(messages.concat(tmp));
            setIsLoadMore(false);
        }
    };

    const onPressGoBackHandler = () => {
        navigation.goBack();
    };

    return (
        <View>
            <KeyboardAvoidingView
                keyboardVerticalOffset={keyboardVerticalOffset}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                enabled
                style={{...styles.keyboardAvoidingContainer}}>
                <View style={styles.wrapper}>
                    <View style={styles.navigationStackBar}>
                        <TouchableOpacity onPress={onPressGoBackHandler} style={styles.btnBack}>
                            <FontAwesome5Icon
                                name="arrow-left"
                                size={24}
                                color="#000"></FontAwesome5Icon>
                        </TouchableOpacity>
                        <View style={styles.stackBarTitle}>
                            <Text style={{fontSize: 18, color: '#000'}}>{partner.username}</Text>
                        </View>
                    </View>
                </View>
                <FlatList
                    inverted={true}
                    style={{marginTop: 45, marginBottom: 60}}
                    data={messages}
                    keyExtractor={item => item.message_id}
                    ListEmptyComponent={<View />}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() => isLoadMore && <ActivityIndicator size="large" />}
                    renderItem={({item, index}) => {
                        // console.log();
                        return (
                            <MessageItem
                                key={index}
                                user={user}
                                message={item}
                                isMe={item.sender.id === userId}
                            />
                        );
                    }}
                />
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: '#fff',
                        padding: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 30,
                    }}>
                    <TextInput
                        style={{
                            height: 40,
                            borderColor: '#0C7EF2',
                            borderWidth: 1,
                            color: '#000',
                            flex: 1,
                            borderRadius: 15,
                            paddingLeft: 15,
                        }}
                        onChangeText={text => setMessageContent(text)}
                        placeholder="Aa"
                        value={messageContent}
                    />
                    <TouchableOpacity
                        style={styles.btnSendCommentWrapper}
                        disabled={messageContent.trim() != '' ? false : true}
                        onPress={onSendPressHandler}>
                        <FontAwesome5Icon
                            name="paper-plane"
                            size={20}
                            color={messageContent.trim() != '' ? '#318bfb' : 'gray'}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ChannelScreen;

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const messageInputWrapperHeight = 50;

const styles = StyleSheet.create({
    keyboardAvoidingContainer: {
        height: screenHeight,
        zIndex: 2,
    },
    wrapper: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '100%',
    },
    stackBarTitle: {
        position: 'absolute',
        width: screenWidth,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: 40,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    navigationStackBar: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    btnBack: {
        zIndex: 99,
    },
    container: {
        padding: 10,
        backgroundColor: '#ffffff',
    },
    btnSendCommentWrapper: {
        height: 40,
        width: 40,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
