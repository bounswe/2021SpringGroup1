import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet, Button, Image, TextInput} from 'react-native';
import {axiosInstance} from "../service/axios_client_service";

function AllCommunitiesScreen({navigation}) {

    console.log("c");
    const [allCommunities, changeCommunities] = useState([]);
    const [keyword, setKeyword] = React.useState('');

    useEffect(() => {
            getUserCommunities();
        }, []
    );

    const getUserCommunities = () => {
        axiosInstance.get('list_communities', {
            params: {
                from: "all"
            }
        }).then(async response => {
            if (response.status === 200) {
                console.log("getting all communities success!");
                changeCommunities(response.data["Communities"]);
                console.log("asdasdasd");
                console.log(allCommunities);
            }
        })
    }

    return (
        <View style={styles.background}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Communities</Text>
                <View>
                    <TextInput style={styles.textInput}
                    placeholder="Search Community"
                    onChangeText={keyword=>setKeyword(keyword)}></TextInput>
                    <Button
                    title="Search"
                    onPress={() => filterComms(keyword,changeCommunities)}/>
                </View>

            </View>
            <View style={styles.listContainer}>
                <FlatList
                    //keyExtractor={(item) => item.id}
                    data={allCommunities}
                    renderItem={({item}) => (
                        <View style={styles.comms}>
                            <Image source={{uri: item["community_image_url"]}} style={styles.tinyLogo}/>
                            <Button title={item["name"]}
                                    style={styles.item}
                                    onPress={() => navigation.navigate("Community", {communData: item})}/>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

async function filterComms(word, changeCommunities) {
    console.log("aaaaaaaaaaaaaaaaaaaa");
    console.log(word);
    console.log("bbbbbbbbbbbbbbbbbbb");
    const res = axiosInstance.get(
        'search_communities', {
            params:{
                text: word
            }
        }
    ).then(async response => {
        if (response.status === 200) {
            console.log("filtering communities success!");
            console.log(response.data);
            changeCommunities(response.data);
        }
    })
    return
}


const styles = StyleSheet.create({
    background: {
        backgroundColor: "dodgerblue",
        flex: 1,
        alignItems: "center"
    },
    titleContainer: {
        top: 40,
        alignItems:"center"
    },
    title: {
        fontSize: 20,
        color: "white"
    },
    listContainer: {
        top: 50,
        alignItems: "center",
        backgroundColor: "white",
        width: "80%",
        height: "65%"

    },
    item: {
        fontSize: 20,
        padding: 5
    },
    tinyLogo: {
        width: 35,
        height: 35,
    },
    comms: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    textInput: {
        width: 200,
        height: 50,
        margin: 10,
        fontSize: 20,
        borderWidth: 0.7,
        padding: 10,
        backgroundColor: "white",
        borderColor: "gray"
    }
})

export default AllCommunitiesScreen;