import React from 'react';
import {View, Text, StyleSheet,ScrollView, Image} from 'react-native';


function PostScreen({route, navigation}) {
    const {postData} = route.params;
    console.log("asdasdasdasdas");
    console.log(postData);
    return (
        <ScrollView style={styles.background}>
            <Text style={styles.postTitle}>{postData["title"]}</Text>
            {postData["data_fields"].filter(item=>item.type==="text").map((input) => (
                <View style={styles.contentContainer}>
                    <Text style={styles.contentTitle}>{input.name}</Text>
                    <Text style={styles.contentText}>{input.content.prop1}</Text>
                </View>
            ))}

            {postData["data_fields"].filter(item=>item.type==="image").map((input) => (
                <View style={styles.contentContainer}>
                    <Text style={styles.contentTitle}>{input.name}</Text>
                    <Image style={styles.stretch} source={{uri:input.content.prop1}}/>
                </View>
            ))}

            <View style={styles.detailList}>
                <Text style={styles.postDetail}>posted by: {postData["poster_name"]}</Text>
                <View style={{paddingLeft: 10, padding: 10}}/>
                <Text style={styles.postDetail}>{postData["created_date"].substring(0,10)} | {postData["created_date"].substring(11,19) }</Text>
            </View>
            <Text style={styles.postDescription}>{postData["description"]}</Text>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "lightblue",
        flex: 1,
        alignContent: "center"
    },
    postTitle: {
        fontSize: 40,
        padding: 15,
        textAlign: "center"
    },
    postDescription: {
        fontSize: 20,
        textAlign: "center"
    },
    postDetail: {
        fontSize: 20
    },
    flatList: {
        width: "100%"
    },
    detailList: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10
    },
    contentContainer: {
        alignItems: "center",
        padding: 3
    },
    contentTitle:{
        fontSize: 30
    },
    contentText: {
        fontSize:20,
        padding:2
    },
    stretch: {
        width: 300,
        height: 200,
        resizeMode: 'stretch',
      }

})

export default PostScreen;