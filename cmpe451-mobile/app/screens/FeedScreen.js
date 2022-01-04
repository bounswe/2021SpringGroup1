import React, {useEffect, useState} from 'react';
import {RefreshControl, View , Text, StyleSheet, FlatList, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {axiosInstance} from "../service/axios_client_service";


function FeedScreen({navigation}) {

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getUserFeed();
      setTimeout(() => { setRefreshing(false) }, 2000);
    }, []);

    
    const [userFeed, changeFeed] = useState([]);

    useEffect(() => {
            getUserFeed();
        },[]
    );

    const getUserFeed = () => {
        axiosInstance.get('get_user_home_feed'
        ).then(async response => {
            if (response.status === 200) {
                console.log("getting user feed success!");
                changeFeed(response.data);
            }
            else{
                console.log("error on getUserFeed")
            }
        })
    }

    
    return (
        <View style={styles.background}>
            {/* <View style={styles.titleContainer}>
                <Text style={styles.title}>Feed</Text>
                <View style={styles.searchContainer}>
                        <TextInput style={styles.textInput}
                        placeholder="Search Posts with Title"
                        onChangeText={keyword => filterPosts(keyword,changeFeed)}></TextInput>
                </View>
            </View>  */}
            <View style={styles.listContainer}>
                <FlatList
                    //keyExtractor={(item) => item.id}
                    style={styles.flatList}
                    data={userFeed}
                    ListEmptyComponent={<View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Looks like your feed is empty. Subscribe to a community to see their posts here.</Text>
                </View>}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.postContainer}
                            onPress={() => navigation.navigate("Post",{postData: item})}>
                            <Text style={styles.postTitle}>{item.title}</Text>
                            <Text style={styles.postComm}>Posted in {item.community_name}</Text>

                            <Text style={styles.postInfo}>Posted by {item.poster_name}</Text>
                            <Text style={styles.postInfo}>{isoDateConvert(item.created_date)}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}
  
// async function filterPosts(word, changeFeed) {
//     console.log("aaaaaaaaaaaaaaaaaaaa");
//     console.log(word);
//     console.log("bbbbbbbbbbbbbbbbbbb");
//     const res = axiosInstance.get(
//         'search_posts_in_community', {
//             params:{
//                 text: word
//             }
//         }
//     ).then(async response => {
//         if (response.status === 200) {
//             console.log("filtering communities success!");
//             console.log(response.data);
//             changeCommunities(response.data);
//         }
//     })
//     return
// }

function isoDateConvert(input){
    const time = new Date(input);

    return time.toDateString();
}
const styles = StyleSheet.create({
    background:{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center"
    },
    titleContainer: {
        paddingBottom:10
    },
    title: {
        fontSize: 30,
        color: "black"
    },
    searchContainer:{
        flexDirection: "row",
        width:"100%",
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
    listContainer: {
        alignItems: "center",
        backgroundColor: "rgb(39, 84, 125)",
        width: "90%",
        flex:1
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


export default FeedScreen;