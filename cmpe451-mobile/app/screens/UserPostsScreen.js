import React, {useEffect, useState} from 'react';
import {RefreshControl,View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import {axiosInstance} from "../service/axios_client_service";


function UserPostsScreen({navigation}) {
    //const items = getUserPosts();

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getUserPosts();
      setTimeout(() => { setRefreshing(false) }, 2000);
    }, []);


    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
            getUserPosts();
        },[]
    );

    const getUserPosts = () => {
        axiosInstance.get('get_user_created_posts'
        ).then(async response => {
            if (response.status === 200) {
                console.log("getting user posts success!");
                setUserPosts(response.data);
            }
            else{
                console.log("error on getUserFeed")
            }
        })
    }
    return (
        <View style={styles.background}>
            {/* <View style={styles.titleContainer}>
                <Text style={styles.title}>Your Posts</Text>
            </View> */}
            <View style={styles.listContainer}>
                <FlatList
                    //keyExtractor={(item) => item.id}
                    style={styles.flatList}
                    data={[...userPosts].reverse()}
                    ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Looks like you didn't post anything yet.</Text>
                    </View>}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                    renderItem={({item}) => (
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
    postDescription: {
        fontSize:15,
        textAlign: "center"
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
        paddingTop: 30,
        paddingHorizontal: 50
    }
})

export default UserPostsScreen;