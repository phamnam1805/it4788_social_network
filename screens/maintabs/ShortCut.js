import React, {Component} from 'react';
import {View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux';
import ExTouchableOpacity from '../components/ExTouchableOpacity';
import {navigation} from '../../RootNavigation';
// import {useNavigation} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {SCREEN_WIDTH} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ShortCut extends Component {
    constructor(props) {
        super(props);
        this._maxOptionsHeight = 9 * 50;
        this._moreOptionsHeight = new Animated.Value(0);
    }
    onPressViewMyProfileHandler() {
        navigation.navigate('Profile');
    }
    onPressLogOut() {
        AsyncStorage.removeItem('jwt_token');
        navigation.replace('SplashScreen');
    }
    render() {
        // const {user} = this.props;
        return (
            <View style={styles.container}>
                <ScrollView bounces={false}>
                    <ExTouchableOpacity
                        style={styles.btnProfile}
                        onPress={this.onPressViewMyProfileHandler}>
                        <Image
                            style={styles.avatar}
                            source={require('../../assets/icons/logout.png')}
                        />
                        <View>
                            <Text style={styles.name}>Name</Text>
                            <Text style={{color: '#333'}}>View your profile page</Text>
                        </View>
                    </ExTouchableOpacity>

                    <ExTouchableOpacity style={styles.btnOption} onPress={this.onPressLogOut}>
                        <Image
                            style={styles.icon}
                            source={require('../../assets/icons/logout.png')}
                        />
                        <View>
                            <Text style={styles.name}>Logout </Text>
                        </View>
                    </ExTouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}
// const mapStateToProps = state => {
//     return {
//         user: state.user.user,
//         friends: state.user.friends,
//     };
// };
// export default connect(mapStateToProps, null)(ShortCut);
export default ShortCut;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    btnProfile: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    btnOption: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 15,
    },
    avatar: {
        height: 32,
        width: 32,
        borderRadius: 32,
        marginRight: 10,
        borderColor: '#333',
        borderWidth: 0.2,
    },
    icon: {
        height: 24,
        resizeMode: 'contain',
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    centerBtnShowMore: {
        width: SCREEN_WIDTH - 100,
    },
});
