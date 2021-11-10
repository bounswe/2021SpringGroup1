import React from 'react';
import { View , Text, StyleSheet, FlatList, Button } from 'react-native';


function UserPostsScreen(props) {
    const items = getUserPosts();

    return (
        <View style={styles.background}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Users Posts</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    //keyExtractor={(item) => item.id}
                    style={styles.flatList}
                    data={items}
                    renderItem={({ item }) => (
                        <View style={styles.postContainer}>
                            <Text style={styles.postTitle}>{item.title}</Text>
                            <Text style={styles.postDescription}> {item.description} </Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}


// this should be an api call that returns a json like this.
function getUserPosts(){
    return [{title: "title1", description: "desc1", data_fields:[]},
    {title: "title2", description: "desc2", data_fields:[]},
    {title: "title3", description: "desc3", data_fields:[]},
    {title: "title4", description: "desc4", data_fields:[]},
    {title: "title5", description: "desc5", data_fields:[]},
    {title: "title6", description: "desc6", data_fields:[]},
    ];
}   
  
const styles = StyleSheet.create({
    background:{
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
    postContainer: {
        margin:5,
        backgroundColor: "yellow",
        alignItems: "center",
        width: "90%"
    },
    postTitle: {
        fontSize:20
    },
    postDescription: {
        fontSize:15
    },
    flatList: {
        width: "100%"
    }
})

export default UserPostsScreen;