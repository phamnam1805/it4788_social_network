import React, {Component, useState} from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    Animated,
    ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
    closePostDetailModal,
    openCommentModal,
    FetchPostDetailRequest,
} from '../actions/postDetailActions';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Swiper from 'react-native-swiper';

import {navigation} from '../../../core/Navigation';
import {Routes} from '../../../core/Routes';
import {commentOperations} from '../../../core/slice/Comment';
import {postOperations, postSelectors} from '../../../core/slice/Post';

const ImageSwiper = React.memo(
    props => {
        const {image} = props;
        return (
            <Swiper showsPagination={false}>
                {image.map((imageItem, index) => (
                    <View key={index} style={styles.imageWrapper}>
                        <Image
                            style={styles.image}
                            resizeMode="contain"
                            source={{uri: imageItem}}></Image>
                    </View>
                ))}
            </Swiper>
        );
    },
    (prevProps, nextProps) => true,
);

const FullScreenImageView = ({route}) => {
    const {index} = route.params || {};
    const post = useSelector(state => postSelectors.getPost(state, index));

    const onPressGoBackHandler = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.postWrapper}>
            {/* <Swiper showsPagination={false}>
                {post.image.map((imageItem, index) => (
                    <Image
                        onPress={onPressHideDetailWrapperHandler.bind(this)}
                        key={index}
                        style={styles.image}
                        resizeMode="contain"
                        source={{uri: imageItem}}></Image>
                ))}
            </Swiper> */}
            <ImageSwiper image={post.image} />
        </View>
    );
};

export default FullScreenImageView;

const styles = StyleSheet.create({
    postWrapper: {
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,1)',
        height: '100%',
    },
    optionIconWrapper: {
        position: 'absolute',
        right: 30,
        top: 50,
        zIndex: 999999,
    },
    cycleWrapper: {
        padding: 10,
    },

    optionListWrapper: {
        position: 'absolute',
        left: 0,
        height: '100%',
        zIndex: 999999,
        backgroundColor: 'rgba(0,0,0,0)',
        width: '100%',
    },
    allOptionWrapper: {
        backgroundColor: '#fff',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 2,
    },
    optionBackDrop: {
        // backgroundColor: "red",
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
    },
    optionItemWrapper: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16,
    },
    postContentWrapper: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        left: 0,
        width: '100%',
        // zIndex: 99,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    name: {
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        color: '#fff',
    },
    time: {
        marginTop: 5,
        color: '#fff',
        // textTransform: 'uppercase',
        opacity: 0.5,
    },
    btnReactionWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
    },
    reactionBtnText: {
        color: '#fff',
        marginLeft: 5,
    },
    btnWrapper: {
        flex: 1,
    },
    reactionBtn: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageWrapper: {},
    image: {
        backgroundColor: 'rgba(0,0,0,0)',
        height: '100%',
    },
    reactionValueWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    reactionNumberWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
