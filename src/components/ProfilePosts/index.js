import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useMemo, useState } from 'react';
import { LogicCode, SCREEN_WIDTH } from '../../core/Constants';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../../core/Navigation'
import { useSelector } from 'react-redux';
import { userSelectors, userOperations } from '../../core/slice/User';
import { useAsync } from 'react-use';
import { appSelectors } from '../../core/slice/App';
import axios from 'axios';
import { BASE_URL } from '../../core/Constants';
import { Routes } from '../../core/Routes';
import { postSelectors } from '../../core/slice/Post';
import PostItem from '../PostItem';

const ProfilePosts = ({userId}) => {

   
    return (<View>
         
    </View>)
}

export default ProfilePosts;