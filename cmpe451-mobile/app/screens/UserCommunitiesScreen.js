import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {axiosInstance} from "../service/axios_client_service";
import {Image} from "react-native-web";


function UserCommunitiesScreen({navigation}) {
    console.log("b");
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
                changeCommunities(response.data["Communities"]);
            }
        })
    }


    return (
        <View style={styles.background}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Users Communities</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    //keyExtractor={(item) => item.id}
                    data={userCommunities}
                    renderItem={({item}) => (
                        <View>
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

const styles = StyleSheet.create({
    background: {
        backgroundColor: "dodgerblue",
        flex: 1,
        alignItems: "center"
    },
    titleContainer: {
        top: 40
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
        height: "80%"

    },
    item: {
        fontSize: 20,
        padding: 5
    }
})

export default UserCommunitiesScreen;