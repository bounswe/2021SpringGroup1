import React, {useEffect, useState} from 'react';
import { View , Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import {axiosInstance} from "../service/axios_client_service";


function UserPostsScreen({navigation}) {
    //const items = getUserPosts();


    const [userPosts, changePosts] = useState([]);

    useEffect(() => {
            getUserPosts();
        }, []
    );

    const getUserPosts = () => {
        axiosInstance.get('get_user_created_posts'
        ).then(async response => {
            if (response.status === 200) {
                console.log("getting user posts success!");
                changePosts(response.data);
            }
        })
    }


    return (
        <View style={styles.background}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Users Posts</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    //keyExtractor={(item) => item.id}
                    style={styles.flatList}
                    data={userPosts}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.postContainer}
                        onPress={() => navigation.navigate("Post",{postData: item})}>
                            <Text style={styles.postTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}


// // this should be an api call that returns a json like this.
// function getUserPosts(){
//     return [{title: "title1", description: "desc1", data_fields:[]},
//     {title: "title2", description: "desc2", data_fields:[]},
//     {title: "title3", description: "desc3", data_fields:[]},
//     {title: "title4", description: "desc4", data_fields:[]},
//     {title: "title5", description: "desc5", data_fields:[]},
//     {title: "title6", description: "desc6", data_fields:[]},
//     ];
// }   
  
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
        backgroundColor: "lightblue",
        alignItems: "center",
        height: 75
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