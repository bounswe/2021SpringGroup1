import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import {axiosInstance} from "../service/axios_client_service";


function UserPostsScreen({navigation}) {
    //const items = getUserPosts();

    const userPosts = [
        {
            "id": 10,
            "poster": "elxif",
            "community": "chess lovers",
            "title": "how can i improve myself?",
            "post_template": 0,
            "description": "I'm a beginner and I want to get better at chess. What would you suggest?",
            "data_fields": [
                {
                    "name": "string",
                    "type": "text",
                    "content": {
                        "additionalProp1": "string",
                        "additionalProp2": "string",
                        "additionalProp3": "string"
                    },
                    "post": 0
                }
            ],
            "created_date": "today"
        },
        {
            "id": 11,
            "poster": "elxif",
            "community": "chess lovers",
            "title": "Check out this EPIC game.",
            "description": "Check this out. Wow.\n https://www.chessgames.com/perl/chessgame?gid=1011478",
            "post_template": 0,
            "data_fields": [
                {
                    "name": "string",
                    "type": "text",
                    "content": {
                        "additionalProp1": "string",
                        "additionalProp2": "string",
                        "additionalProp3": "string"
                    },
                    "post": 0
                }
            ],
            "created_date": "2 days ago"
        }
    ];
    /*
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

    */
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
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.postContainer}
                                          onPress={() => navigation.navigate("Post", {postData: item})}>
                            <Text style={styles.postTitle}>{item["title"]}</Text>
                            <View style={styles.detailList}>
                                <Text style={styles.postTitle}>{item["poster"]}</Text>
                                <View style={{padding: 60}}/>
                                <Text style={styles.postTitle}>{item["created_date"]}</Text>
                            </View>
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
    postContainer: {
        margin: 5,
        backgroundColor: "lightblue",
        alignItems: "center",
        height: 75
    },
    postTitle: {
        fontSize: 20
    },
    postDescription: {
        fontSize: 15
    },
    postDetail: {
        fontSize: 10
    },
    flatList: {
        width: "100%"
    },
    detailList: {
        flexDirection: 'row',
    }
})

export default UserPostsScreen;