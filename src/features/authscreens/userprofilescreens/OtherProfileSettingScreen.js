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

const OtherProfileSettingScreen = ({route}) => {

    const {user} = route.params;
    const [refreshBlocks, setRefreshBlocks] = useState(false);
    const token = useSelector(appSelectors.getToken);

    const goBack = () => {
        navigation.goBack();
    }

    const openSetBlock = async () => {
        const res = await axios.post(BASE_URL + '/it4788/set_block', {token: token, user_id: user.id});
        if(res.data.code == LogicCode.SUCCESS){
            setRefreshBlocks(!refreshBlocks)
        }
    }
    
    const openSearch = () => {
        navigation.navigate(Routes.SEARCH_POST, {userId: user.id})
    }

    const blocks = useAsync(async () => {
        const res = await axios.post(BASE_URL + '/it4788/get_list_blocks', {
            token: token,
            count: 0
        });

        if(res.data.code == LogicCode.SUCCESS){
            return res.data.data
        }
        return null;
    }, [refreshBlocks, token]);

    const isBlocked = useMemo(() => {
        if(blocks.value && user)
            return blocks.value.blocks.filter(x => x.id == user.id).length > 0;
        return false;
    }, [blocks])

    return (<>
        <View style={styles.container}>
            <View style={styles.navigationBar}>
                <ExTouchableOpacity onPress={goBack} style={styles.btnBack}>
                    <FontAwesome5Icon name="arrow-left" size={20} />
                </ExTouchableOpacity>
                <Text style={styles.titleText}>{user.username}</Text>
            </View>
            <View>
                <ExTouchableOpacity onPress={openSetBlock} style={styles.item}>
                    <FontAwesome5Icon name="lock" style={styles.itemIcon}/>
                    {
                        isBlocked ? (<>
                            <Text style={styles.itemText} >Block</Text>
                        </>): (<>
                            <Text style={styles.itemText} >Unblock</Text>
                        </>)
                    }
                </ExTouchableOpacity>
                <ExTouchableOpacity onPress={openSearch} style={styles.item}>
                    <FontAwesome5Icon name="search" style={styles.itemIcon}/>
                    <Text style={styles.itemText} >Search</Text>
                </ExTouchableOpacity>
            </View>
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

export default OtherProfileSettingScreen;