import React from 'react';
import {View, Text, StyleSheet, Button, FlatList, TouchableOpacity} from "react-native";


function CommunityScreen({route, navigation}) {
    const {communData} = route.params;
    const posts = getCommunityPosts();

    return (
        
        <View style={styles.background}>
            <View style={styles.banner}>
                <Text style={styles.commTitle}>{communData.name}</Text>
                <Button style={styles.button}title="Subscribe"></Button>
            </View>
            <View style={styles.body}>
                <FlatList
                    //keyExtractor={(item) => item.id}
                    style={styles.flatList}
                    data={posts}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.postContainer}
                        onPress={() => navigation.navigate("Post",{postData: item})}>
                            <Text style={styles.postTitle}>{item.title}</Text>
                            <Text style={styles.postDescription}> {item.description} </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

function getCommunityPosts(){
    return [{title: "comm1post1", description: "desc1", data_fields:[]},
    {title: "title2", description: "desc2", data_fields:[]},
    {title: "title3", description: "desc3", data_fields:[]},
    {title: "title4", description: "desc4", data_fields:[]},
    {title: "title5", description: "desc5", data_fields:[]},
    {title: "title6", description: "desc6", data_fields:[]},
    ];
}   
const styles = StyleSheet.create({
    background:{
        flex: 1,
        alignItems: "center"
    },
    banner: {
        backgroundColor:"lightblue",
        width:"100%",
        height: "20%"
    },
    body: {
        
        backgroundColor:"dodgerblue",
        width:"100%",
        height: "80%",
        alignItems: "center"
    },
    commTitle: {
        fontSize: 30,
        padding: 15,
        textAlign: "center"
    },
    commDescription: {
        fontSize: 20,
        textAlign:"center"
    },
    flatList: {
        width: "100%"
    },
    postContainer: {
        margin: 10,
        backgroundColor: "lightblue",
        alignItems: "center",
        height: 75
    },
    postTitle: {
        fontSize: 20
    },
    postDescription: {
        fontSize:15
    },
    button: {
        width: "50%"
    }

})

export default CommunityScreen;