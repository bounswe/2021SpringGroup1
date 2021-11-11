import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


function PostScreen({route, navigation}) {
    const {postData} = route.params;
    return (
        <View style={styles.background}>
            <Text style={styles.postTitle}>{postData.title}</Text>
            <Text style={styles.postDescription}>{postData.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    background:{
        backgroundColor: "lightblue",
        flex: 1,
        alignContent:"center"
    },
    postTitle: {
        fontSize: 30,
        padding: 15,
        textAlign: "center"
    },
    postDescription: {
        fontSize: 20,
        textAlign:"center"
    }

})

export default PostScreen;