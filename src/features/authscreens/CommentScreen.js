import React, {Component, createRef, useEffect, useState} from 'react';
import {
    Animated,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import {ScrollView, PanGestureHandler, State} from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import CommentItem from '../../components/CommentItem';
import MemorizedCommentList from '../../components/CommentList';
import {FIXED_STATUSBAR_HEIGHT} from '../../core/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {commentOperations, commentSelectors} from '../../core/slice/Comment';
import {navigation} from '../../core/Navigation';

const CommentScreen = ({route}) => {
    const {postId, postIndex} = route.params || {};
    const comments = useSelector(state => commentSelectors.getComment(state, postId));
    const textInputRef = React.createRef();

    const dispatch = useDispatch();

    const [commentContent, setCommentContent] = useState('');
    const [isReload, setIsReload] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);

    const handleReload = () => {
        if (!isReload) {
            setIsReload(true);
            dispatch(
                commentOperations.fetchGetListComments({postId: postId, reloadFlag: true}),
            ).then(() => {
                setIsReload(false);
            });
        }
    };

    const handleLoadMore = () => {
        if (!isLoadMore) {
            setIsLoadMore(true);
            dispatch(commentOperations.fetchGetListComments({postId: postId})).then(() => {
                setTimeout(() => setIsLoadMore(false), 10000);
            });
        }
    };

    const onPressGoBackHandler = () => {
        navigation.goBack();
    };

    const onSendPressHandler = () => {
        Keyboard.dismiss();
        dispatch(
            commentOperations.fetchAddComment({
                postId: postId,
                commentContent: commentContent,
                postIndex: postIndex,
            }),
        ).then(() => setCommentContent(''));
    };

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    };

    // return (
    //     <View>
    //         <Text>Comments</Text>
    //     </View>
    // );
    // console.log(comments);
    return (
        <View>
            {/* <View style={styles.backdrop}></View> */}
            <KeyboardAvoidingView
                keyboardVerticalOffset={keyboardVerticalOffset}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                enabled
                style={{...styles.keyboardAvoidingContainer}}>
                <View style={{...styles.wrapper}}>
                    <View style={styles.navigationStackBar}>
                        <TouchableOpacity onPress={onPressGoBackHandler} style={styles.btnBack}>
                            <FontAwesome5Icon name="arrow-left" size={24}></FontAwesome5Icon>
                        </TouchableOpacity>
                        <View style={styles.stackBarTitle}>
                            <Text style={{fontSize: 18}}>Comments</Text>
                        </View>
                    </View>
                    <ScrollView
                        scrollEventThrottle={40}
                        style={styles.container}
                        refreshControl={
                            <RefreshControl refreshing={isReload} onRefresh={handleReload} />
                        }
                        onScroll={({nativeEvent}) => {
                            if (isCloseToBottom(nativeEvent)) {
                                handleLoadMore();
                            }
                        }}>
                        <MemorizedCommentList comments={comments} />
                        <View visible={isLoadMore}>
                            <ActivityIndicator
                                animating={isLoadMore}
                                color="#000000"
                                size="large"
                                style={styles.activityIndicator}
                            />
                        </View>
                    </ScrollView>
                    <View style={styles.commentInputWrapper}>
                        <View style={styles.textInputWrapper}>
                            <TextInput
                                autoFocus={true}
                                style={styles.textInput}
                                onChangeText={text => setCommentContent(text)}
                                onSubmitEditing={onSendPressHandler}
                                returnKeyType="send"
                                ref={textInputRef}
                                value={commentContent}></TextInput>
                        </View>
                        <TouchableOpacity
                            style={styles.btnSendCommentWrapper}
                            disabled={commentContent.trim() != '' ? false : true}
                            onPress={onSendPressHandler}>
                            <FontAwesome5Icon
                                name="paper-plane"
                                size={20}
                                color={
                                    commentContent.trim() != '' ? '#318bfb' : 'gray'
                                }></FontAwesome5Icon>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default CommentScreen;

const STACK_NAVBAR_HEIGHT = 48;
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const commentInputWrapperHeight = 50;
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

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
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
    },
    container: {
        padding: 10,
        marginBottom: commentInputWrapperHeight,
        backgroundColor: '#ffffff',
    },
    commentInputWrapper: {
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: '#ddd',
        position: 'absolute',
        bottom: 30,
        left: 0,
        paddingHorizontal: 15,
        height: commentInputWrapperHeight,
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cameraIconWrapper: {
        backgroundColor: '#ddd',
        borderRadius: 50,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSendCommentWrapper: {
        height: 40,
        width: 40,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputWrapper: {
        height: 40,
        borderTopLeftRadius: 48,
        borderBottomLeftRadius: 48,
        borderTopRightRadius: 48,
        borderBottomRightRadius: 48,
        backgroundColor: '#ddd',
        marginRight: 10,
        width: screenWidth - 40 - 30 - 10,
        borderRightWidth: 0,
    },
    textInput: {
        width: '100%',
        height: 40,
        paddingHorizontal: 15,
        alignItems: 'center',
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
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});
