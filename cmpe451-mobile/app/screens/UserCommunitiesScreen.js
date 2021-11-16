import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Button, Image} from 'react-native';
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
    /*
    const techno = {
        "community": 3,
        "name": "Event",
        "description": "A techno event taking place at a specific time and place.",
        "data_field_templates": [
            {
                "name": "Organizer",
                "type": "text",
                "post_template": 1
            },
            {
                "name": "Date",
                "type": "text",
                "post_template": 1
            },
            {
                "name": "Venue",
                "type": "text",
                "post_template": 1
            },
            {
                "name": "Poster",
                "type": "image",
                "post_template": 1
            },
        ]
    };
    */


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

export default UserCommunitiesScreen;