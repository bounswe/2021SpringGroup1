import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet, Button, Image} from 'react-native';
import {axiosInstance} from "../service/axios_client_service";

function AllCommunitiesScreen({navigation}) {

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
                console.log(allCommunities);
            }
        })
    }


    return (
        <View style={styles.background}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>All Communities</Text>
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
})

export default AllCommunitiesScreen;