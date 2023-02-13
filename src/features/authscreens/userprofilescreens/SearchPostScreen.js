import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import {useAsync} from 'react-use';
import { useMemo, useState } from 'react';
import * as navigation from '../../../core/Navigation';
import axios from 'axios';
import { BASE_URL } from '../../../core/Constants';
import { appSelectors } from '../../../core/slice/App';
import { useSelector } from 'react-redux';
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { LogicCode } from '../../../core/Constants';
import { Routes } from '../../../core/Routes';

const SearchPostScreen = () => {
    return (<>
        <View>

        </View>
    </>)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    navigationBar: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    titleText : {
        fontWeight: 700,
        fontSize: 20
    },
    btnBack: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        borderTopWidth: 5,
        borderBottomWidth: 5,
        borderColor: "rgba(0,0,0,0.1)",
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemIcon: {
        fontSize: 20,
        marginRight: 20
    },
    itemText: {
        fontSize: 16,
        fontWeight: 500
    }
});

export default SearchPostScreen;