import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Text, Dimensions, StyleSheet} from 'react-native';
import CommentItem from './CommentItem';

const CommentList = ({comments}) => {
    return (
        <>
            {comments.listComments.map((comment, index) => (
                <CommentItem key={index} comment={comment}>
                    Detail
                </CommentItem>
            ))}
        </>
    );
};

const MemorizedCommentList = React.memo(
    CommentList,
    (prevProps, nextProps) =>
        prevProps.comments.listComments.length === nextProps.comments.listComments.length,
);
export default MemorizedCommentList;
