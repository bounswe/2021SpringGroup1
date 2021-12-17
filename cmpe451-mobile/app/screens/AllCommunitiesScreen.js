import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet, Button, Image, TextInput, TouchableOpacity,RefreshControl} from 'react-native';
import {axiosInstance} from "../service/axios_client_service";

function AllCommunitiesScreen({navigation}) {

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getUserCommunities();
      setTimeout(() => { setRefreshing(false) }, 2000);
    }, []);



    console.log("c");
    const [allCommunities, changeCommunities] = useState([]);

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
                <View style={styles.searchContainer}>
                        <TextInput style={styles.textInput}
                        placeholder="Search Community"
                        onChangeText={keyword=>filterComms(keyword,changeCommunities)}></TextInput>
                </View>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    //keyExtractor={(item) => item.id}
                    data={allCommunities}
                    style={styles.flatList}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                    renderItem={({item}) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity
                                style={styles.itemButton}
                                onPress={() => navigation.navigate("Community", {communData: item})}>
                                <View style={styles.imageContainer}>
                                    <Image source={{uri: item["community_image_url"]}} style={styles.itemImage}/>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.itemText}>{item["name"]}</Text>
                                </View>
                            </TouchableOpacity>
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
        backgroundColor: "white",
        flex: 1,
        alignItems: "center"
    },
    titleContainer: {
        alignItems:"center",
        paddingBottom:10,
        width: "90%"
    },
    title: {
        fontSize: 30,
        color: "black"
    },
    searchContainer:{
        flexDirection: "row",
        width:"100%",
        alignItems:"center"
    },

    textInput: {
        width:"100%",
        fontSize: 20,
        borderWidth: 0.7,
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: "white",
        borderColor: "gray",
    },

    listContainer: {
        alignContent: "center",
        backgroundColor: "rgb(39, 84, 125)",
        flex: 1,
        width:"90%"
    },
    itemText: {
        fontSize:25,
        color: "white",
    },
    itemImage: {
        width:"100%",
        height:"100%"
    },
    itemButton: {
        width: "100%",
        flexDirection: "row"
    },

    itemContainer: {
        alignSelf: "center",
        alignItems:"center",
        padding: 5,
        margin: 10,
        flex:1,
        width: "90%",
    },
    flatList: {
        width: "100%",    
    },
    imageContainer: {
        flex:3,
        paddingRight:5
    },
    textContainer: {
        flex:7,
        alignItems: "flex-start",
        paddingLeft: 5
    },

})

export default AllCommunitiesScreen;