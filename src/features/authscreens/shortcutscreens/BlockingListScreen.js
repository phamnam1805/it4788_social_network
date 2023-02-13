import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import {useAsync} from 'react-use';
import { useState } from 'react';
import * as navigation from '../../../core/Navigation';
import axios from 'axios';
import { BASE_URL } from '../../../core/Constants';
import { appSelectors } from '../../../core/slice/App';
import { useSelector } from 'react-redux';
import ExTouchableOpacity from '../../../components/ExTouchableOpacity';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { LogicCode } from '../../../core/Constants';
import { Routes } from '../../../core/Routes';


const BlockingListScreen = () => {
    const [refreshBlocks, setRefreshBlocks] = useState(false);
    const token = useSelector(appSelectors.getToken);
    const userId = useSelector(appSelectors.getUserId);

    const goBack = () => {
        navigation.goBack();
    }

    const openSetBlockScreen = () => {
        navigation.navigate(Routes.ADD_BLOCKING_LIST);
    }

    const openSetBlock = async (inputUserId) => {
        const res = await axios.post(BASE_URL + '/it4788/set_block', {token: token, user_id: inputUserId});
        if(res.data.code == LogicCode.SUCCESS){
            setRefreshBlocks(!refreshBlocks)
        }
    }

    var blocks = useAsync(async () => {
        const res = await axios.post(BASE_URL + '/it4788/get_list_blocks', {
            token: token,
            count: 0
        });

        if(res.data.code == LogicCode.SUCCESS){
            return res.data.data
        }
        return null;
    }, [refreshBlocks, token, userId]);
    
    return (<>
         <View style={styles.container}>
            <View style={styles.navigationBar}>
                <ExTouchableOpacity onPress={goBack} style={styles.btnBack}>
                    <FontAwesome5Icon name="arrow-left" size={20} />
                </ExTouchableOpacity>
                <Text style={styles.titleText}>Block List</Text>
            </View>
            <ExTouchableOpacity onPress={openSetBlockScreen} style={{flexDirection: 'row', alignItems: 'center', 
                marginHorizontal: 20, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.1)",
                marginVertical: 20, paddingVertical: 10}}>
                <FontAwesome5Icon style={{fontSize: 20, marginRight: 10, backgroundColor: "rgba(0,0,0, 0.3)", padding: 10, color: 'white'}} name="plus"/>
                <Text style={{fontSize: 16, fontWeight: 500}}>
                    Add To Block List
                </Text>
            </ExTouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
                {blocks.value && blocks.value.blocks.map((block, index ) => (
                    <View style={{flexDirection: 'row', alignItems: 'center', 
                                justifyContent: 'space-between', marginHorizontal: 20,
                                borderBottomColor: "rgba(0,0,0,0.1)",
                                borderBottomWidth: 2,    
                            }} key={index}>
                        <View style={styles.item}>
                            <Image style={styles.itemImage} source ={{uri : block.avatar}} />
                            <Text style={styles.itemName}>{block.username}</Text>
                        </View>
                        <ExTouchableOpacity onPress={()=> openSetBlock(block.id)} style={{marginLeft: 10, paddingHorizontal: 10, paddingVertical: 10, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                            <Text style={{color: 'white', fontWeight: 500}}>Unblock</Text>
                        </ExTouchableOpacity>
                    </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 30,
        paddingVertical: 15,
        flex: 1
    },
    itemImage: {
        width: 50,
        height: 50
    },
    itemName: {
        fontSize: 16,
        fontWeight: 500
    }
});

export default BlockingListScreen;