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


const AddBlockListScreen = () => {

    const token = useSelector(appSelectors.getToken);
    const userId = useSelector(appSelectors.getUserId);
    const [refreshBlock, setRefreshBlock] = useState(false);
    
    const goBack = () => {
        navigation.goBack();
    }

    const openSetBlock = async (inputUserId) => {
        const res = await axios.post(BASE_URL + '/it4788/set_block', {token: token, user_id: inputUserId});
        if(res.data.code == LogicCode.SUCCESS){
            setRefreshBlock(!refreshBlock)
        }
    }

    var state = useAsync(async () => {
        const res = await axios.post(BASE_URL + '/it4788/search', {
            token: token,
            user_id: userId,
            count: 0,
            type: 'user'
        });

        const resBlocks = await axios.post(BASE_URL + '/it4788/get_list_blocks', {
            token: token,
            count: 0
        });

        if(res.data.code == LogicCode.SUCCESS && resBlocks.data.code == LogicCode.SUCCESS){
            var list = res.data.data.filter(x => x.id != userId && resBlocks.data.data.blocks.filter(y => y.id == x.id).length == 0)
            return list;
        }
        return null;
    }, [refreshBlock, token, userId]);

    return (<>
        <View style={styles.container}>
            <View style={styles.navigationBar}>
                <ExTouchableOpacity onPress={goBack} style={styles.btnBack}>
                    <FontAwesome5Icon name="arrow-left" size={20} />
                </ExTouchableOpacity>
                <Text style={styles.titleText}>Add Block List</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {state.value && state.value.map((user, index ) => (
                    <View style={{flexDirection: 'row', alignItems: 'center', 
                                justifyContent: 'space-between', marginHorizontal: 20,
                                borderBottomColor: "rgba(0,0,0,0.1)",
                                borderBottomWidth: 2,    
                            }} key={index}>
                        <View style={styles.item}>
                            <Image style={styles.itemImage} source ={{uri : user.avatar_image}} />
                            <Text style={styles.itemName}>{user.username}</Text>
                        </View>
                        <ExTouchableOpacity onPress={()=> openSetBlock(user.id)} style={{marginLeft: 10, paddingHorizontal: 10, paddingVertical: 10, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                            <Text style={{color: 'white', fontWeight: 500}}>Block</Text>
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

export default AddBlockListScreen;