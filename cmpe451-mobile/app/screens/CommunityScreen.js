import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, FlatList, TouchableOpacity} from "react-native";
import {axiosInstance} from "../service/axios_client_service";
import axios from "axios";

function CommunityScreen({route, navigation}) {
    const {communData} = route.params;
    const [posts, changePosts] = useState([]);
    const [commData, changeCommData] = useState(communData);
    let [subscriptionStatus, changeSubscriptionStatus] = useState(false);

    useEffect(() => {
            getCommunityPosts();
        }, []
    );

    useEffect(() => {
            getCommunityData();
        }, []
    );

    useEffect(() => {
            checkSubscriptionStatus();
        }, []
    );

    const getCommunityPosts = () => {
        let uri = 'communities/' + commData["id"] + '/list_community_posts';
        axiosInstance.get(uri, {}).then(async response => {
            if (response.status === 200) {
                //console.log("getting comm posts success!");
                changePosts(response.data);
            }
        })
    }
    const getCommunityData = () => {
        let uri = 'communities/' + commData["id"] + '/get_community_data';
        axiosInstance.get(uri, {
            params: {}
        }).then(async response => {
            if (response.status === 200) {
                //console.log("getting comm data success!");
                changeCommData(response.data["Community"]);
            }
        })
    }

    const checkSubscriptionStatus = () => {
        let uri = 'communities/' + commData["id"] + '/user_subscription';
        axiosInstance.get(uri, {}).then(async response => {
            if (response.status === 200) {
                //console.log("getting subs data success!");
                changeSubscriptionStatus(response.data["IsJoined"]);
            }
        })
    }

    //gives an error with code 403. could not get it to work.
    //presumably, to get it to work we need to pass a header called 'X-CSRFTOKEN'
    async function communitySubscribe() {
        let uri = 'communities/' + commData["id"] + '/user_subscription';
        if (subscriptionStatus) {
            axiosInstance.put(uri, {action: "leave"}, {withCredentials: true}).then(async response => {
                if (response.status === 200) {
                    if (response.data["Success"]) {
                        if (!response.data["IsJoined"]) {
                            console.log("successfully left community");
                            subscriptionStatus = false;
                        }
                    }
                }
            });
        } else {
            console.log(uri);
            console.log(1);
            //console.log(axiosInstance.defaults.baseURL);
            axiosInstance.put(uri, JSON.stringify({action: "join"}), {
                headers: {
                    'X-CSRFTOKEN': 'vhrU9bKR9SAYLhwI6TYK77LKP7keOe2hxd8ssFcdypas3CWTQJdmi81ptIInw3Zx',
                    accept: '*/*'
                }
            }).then(async response => {
                console.log(2);
                if (response.status === 200) {
                    if (response.data["Success"]) {
                        if (response.data["IsJoined"]) {
                            console.log("successfully joined community");
                            subscriptionStatus = true;
                        }
                    }
                }
            });

        }
    }

    return (

        <View style={styles.background}>
            <View style={styles.banner}>
                <Text style={styles.commTitle}>{commData["name"]}</Text>
                <Button style={styles.button} title={subscriptionStatus ? "Leave" : "Subscribe"}
                        onPress={() => communitySubscribe()}/>
                <Text style={styles.commDescription}> {commData["description"]}</Text>
            </View>
            <View style={styles.body}>
                <FlatList
                    //keyExtractor={(item) => item.id}
                    style={styles.flatList}
                    data={posts}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.postContainer}
                                          onPress={() => navigation.navigate("Post", {postData: item})}>
                            <Text style={styles.postTitle}>{item.title}</Text>
                            <Text style={styles.postDescription}> {item.description} </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

function getCommunityPosts() {


    return [{title: "comm1post1", description: "desc1", data_fields: []},
        {title: "title2", description: "desc2", data_fields: []},
        {title: "title3", description: "desc3", data_fields: []},
        {title: "title4", description: "desc4", data_fields: []},
        {title: "title5", description: "desc5", data_fields: []},
        {title: "title6", description: "desc6", data_fields: []},
    ];
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center"
    },
    banner: {
        backgroundColor: "lightblue",
        width: "100%",
        height: "30%"
    },
    body: {
        backgroundColor: "dodgerblue",
        width: "100%",
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
        textAlign: "center"
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
        fontSize: 15
    },
    button: {
        width: "50%"
    }
})

export default CommunityScreen;