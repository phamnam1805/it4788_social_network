import React, {useState, useEffect, Component} from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Item from '../components/Item';
import {FetchPostsRequest} from '../../actions/PostActions';
import {FetchUserData} from '../../actions/UserActions';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {fetchUserData, fetchPosts} = this.props;
        fetchUserData();
        fetchPosts();
    }
    render() {
        const {navigation} = this.props;
        const {posts} = this.props;
        if (posts.length === 0) return <View></View>;
        return (
            <View>
                <ScrollView bounces={false} style={styles.container}>
                    {/* <PostTool></PostTool> */}
                    {posts.map((item, index) => (
                        <View key={index}>
                            <Item item={item} key={index}></Item>
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    }
}
const mapDispatchToProps = async (dispatch, props) => {
    const jwtToken = await AsyncStorage.getItem('jwt_token');
    return {
        fetchUserData: () => dispatch(FetchUserData(jwtToken)),
        fetchPosts: () => dispatch(FetchPostsRequest(jwtToken)),
    };
};
const mapStateToProps = state => {
    return {
        posts: state.posts,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
const screenHeight = Math.round(Dimensions.get('window').height);
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
});
