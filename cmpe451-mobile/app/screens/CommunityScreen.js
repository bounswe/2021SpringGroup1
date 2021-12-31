import React, {useEffect, useState} from 'react';
import {TextInput, RefreshControl, View, Text, StyleSheet, Button, FlatList, TouchableOpacity, ImageBackground, Image} from "react-native";
import {axiosInstance} from "../service/axios_client_service";
import CreatePostTemplateScreen from './CreatePostTemplateScreen';

function CommunityScreen({route, navigation}) {
    const [refreshing, setRefreshing] = React.useState(false);
    let bannerStatus = false;
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getCommunityPosts();
      setTimeout(() => { setRefreshing(false) }, 2000);
    }, []);


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
                console.log(communData["community_image_url"]);
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
        let uri = 'communities/' + commData["id"] + '/user_subscription?action=leave';
        if (subscriptionStatus) {
            axiosInstance.put(uri, {withCredentials: true}).then(async response => {
                console.log(response.data);
                console.log()
                if (response.status === 200) {
                    if (response.data["Success"]) {
                        if (!response.data["IsJoined"]) {
                            console.log("successfully left community");
                            changeSubscriptionStatus(false);
                        }
                    }
                }
            });
        } else {
            console.log(uri);
            console.log(1);
            let uri2 = 'communities/' + commData["id"] + '/user_subscription?action=join';
            //console.log(axiosInstance.defaults.baseURL);
            axiosInstance.put(uri2).then(async response => {
                console.log(2);
                console.log(response.data);
                if (response.status === 200) {
                    if (response.data["Success"]) {
                        if (response.data["IsJoined"]) {
                            console.log("successfully joined community");
                            changeSubscriptionStatus(true);
                        }
                    }
                }
            });

        }
    }



    return (

        <View style={styles.background}>
            <View style={styles.banner}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: communData["community_image_url"] }}
                        style={styles.image} />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.commTitle}>{commData["name"]}</Text>
                    <Text style={styles.commDescription}> {commData["description"]}</Text>

                </View>
            </View>
            <View style={styles.settings}>
                <View>
                    <View>{subscriptionStatus ? (
                        <View style={styles.commButtons}>
                            <TouchableOpacity
                                onPress={() => communitySubscribe()}
                                style={styles.button}>
                                <Text>{subscriptionStatus ? "Leave" : "Subscribe"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("CreatePostTemplate", { community: commData["id"] })}
                                style={styles.button}
                                disabled={subscriptionStatus ? false : true}
                            >
                                <Text>Create Post Template</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("CreatePost", { community: commData["id"] })}
                                style={styles.button}
                                disabled={subscriptionStatus ? false : true}>
                                <Text>Create Post</Text>
                            </TouchableOpacity>
                        </View>
                    )
                        :
                        <TouchableOpacity
                            onPress={() => communitySubscribe()}
                            style={styles.button}>
                            <Text>{subscriptionStatus ? "Leave" : "Subscribe"}</Text>
                        </TouchableOpacity>}
                    </View>

                </View>
                <View style={styles.searchContainer}>
                        <TextInput style={styles.textInput}
                        placeholder="Search Posts in Community by Title"
                        onChangeText={keyword=>filterPosts(keyword,changePosts, commData["id"])}></TextInput>
                </View>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    //keyExtractor={(item) => item.id}
                    style={styles.flatList}
                    data={posts}
                    ListEmptyComponent={<View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Looks like this community doesn't have any post.</Text>
                    </View>}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.postContainer}
                                          onPress={() => navigation.navigate("Post", {postData: item})}>
                            <Text style={styles.postTitle}>Post Title: {item.title}</Text>
                            <Text style={styles.postInfo}>Posted by: {item.poster_name}</Text>
                            <Text style={styles.postInfo}>{isoDateConvert(item.created_date)}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}
async function filterPosts(word, changePosts, communId) {
    let uri = 'communities/' + communId + '/search_posts_in_community?text=' + word;
    console.log(communId);
    console.log(word);
    const res = axiosInstance.get(
        uri
    ).then(async response => {
        if (response.status === 200) {
            console.log("filtering posts success!");
            changePosts(response.data);
        }
    })
    return
}

function isoDateConvert(input){
    const time = new Date(input);

    return time.toDateString();
}
const styles = StyleSheet.create({
    searchContainer:{
        flexDirection: "row",
        width:"90%",
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
    settings: {
        flex: 2
    },
    background: {
        backgroundColor: "white",
        flex: 1,
        alignItems: "center"
    },
    banner: {
        backgroundColor: "white",
        flex:3,
        flexDirection: "row",
        width: "90%",
        paddingTop: 10,
    },
    image: {
        flex:1,
        margin:10
    },
    imageContainer: {
        flex:2,
        
    },
    infoContainer: {
        flex:3,
        padding: 5
    },
    button:{
        backgroundColor: "lightblue",
        alignItems: "center",
        justifyContent: "center",
        padding:10
    },
    commButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    commTitle: {
        fontSize: 25,
        padding: 10,
        textAlign: "center"
    },
    commDescription: {
        fontSize: 15,
        textAlign: "center",
        paddingBottom: 20
    },
    listContainer: {
        alignItems: "center",
        backgroundColor: "rgb(39, 84, 125)",
        width: "90%",
        flex:6,
    },
    postContainer: {
        margin:5,
        padding: 5,
        backgroundColor: "lightblue",
        alignItems: "center",
        alignSelf: "center",
        flex:1,

        width: "75%"
    },
    postComm:{
        fontSize:15
    },
    postTitle: {
        fontSize:25,
        paddingBottom:10
    },
    postInfo: {
        fontSize:15
    },
    flatList: {
        width: "100%"
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
        textAlign: "center",
        paddingTop: 30,
        paddingHorizontal: 50
    }
})

export default CommunityScreen;