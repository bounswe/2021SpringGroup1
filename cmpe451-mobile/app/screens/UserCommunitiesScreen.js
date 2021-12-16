import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Button, Image, TouchableOpacity} from 'react-native';
import {axiosInstance} from "../service/axios_client_service";


function UserCommunitiesScreen({navigation}) {
    const [userCommunities, changeCommunities] = useState([]);

    useEffect(() => {
            getUserCommunities();
        }, []
    );

    const getUserCommunities = () => {
        axiosInstance.get('list_communities', {
            params: {
                from: "joined" //"all"
            }
        }).then(async response => {
            if (response.status === 200) {
                console.log("getting user communities success!");
                changeCommunities(response.data);
            }
        })
    }

    return (
        <View style={styles.background}>
                <Text style={styles.title}>Your Communities</Text>
            <View style={styles.listContainer}>
                <FlatList
                    //keyExtractor={(item) => item.id}
                    data={userCommunities}
                    style={styles.flatList}
                    ListEmptyComponent={<View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Looks like you didn't subscribe to any community yet.</Text>
                </View>}
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

const styles = StyleSheet.create({
    background: {
        backgroundColor: "white",
        flex: 1,
        alignItems: "center"
    },
    title: {
        fontSize: 30,
        color: "black",
        padding:20
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
    emptyContainer:{
        alignItems: "center",
        justifyContent: "center",
        width:"100%",
        height: "100%",
    },
    emptyText:{
        fontSize:20,
        color: "white",
        paddingTop: 30,
        paddingHorizontal: 50
    }
})

export default UserCommunitiesScreen;