import { View, Text, StyleSheet, ScrollView, Image, FlatList, TextInput } from 'react-native';
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
import {useThrottle} from 'react-use';
import { postSelectors } from '../../../core/slice/Post';
import PostItem from '../../../components/PostItem';
import { userSelectors } from '../../../core/slice/User';

const SearchPostScreen = ({route}) => {

    const {userId} = route.params;
    const [search, setSesarch] = useState(search);
    const user = useSelector(userSelectors.getUser);
    const throttled = useThrottle(search, 300);
    const token = useSelector(appSelectors.getToken);
    const statusContent = useSelector(postSelectors.getStatusContent);

    
    const goBack = () => {
        navigation.goBack();
    }

    const state = useAsync(async () => {
        if(!throttled)
            return null;

        const res = await axios.post(BASE_URL + "/it4788/search", {
            token: token,
            keyword: throttled,
            user_id: userId,
            count: 10,
            index: 0
        })

        if(res.data.code == LogicCode.SUCCESS){
            return res.data.data;
        }

        return null;

    }, [throttled, token])

    return (<>
        <View style={styles.container}>
            <View style={styles.navigationBar}>
                <ExTouchableOpacity onPress={goBack} style={styles.btnBack}>
                    <FontAwesome5Icon name="arrow-left" size={20} />
                </ExTouchableOpacity>
                <Text style={styles.titleText}>Search</Text>
            </View>
            <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={setSesarch}
                        value={search}
                        placeholder= "Search"
                    />
            </View>
            <ScrollView>
                {state.value && state.value.map((item, index) => (
                    <PostItem
                        key={item.id}
                        index={index}
                        item={item}
                        user={user}
                        statusContent={statusContent}
                    />
                ))}
            </ScrollView>
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
    },
    input: {
        height: 50,
        borderWidth: 1,
        padding: 10,
    },
});

export default SearchPostScreen;