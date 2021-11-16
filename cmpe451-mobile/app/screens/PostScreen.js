import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


function PostScreen({route, navigation}) {
    const {postData} = route.params;
    return (
        <View style={styles.background}>
            <Text style={styles.postTitle}>{postData["title"]}</Text>
            <View style={styles.detailList}>
                <Text style={styles.postDetail}>{postData["poster"]}</Text>
                <View style={{paddingLeft: 100, padding: 10}}/>
                <Text style={styles.postDetail}>{postData["created_date"]}</Text>
            </View>
            <Text style={styles.postDescription}>{postData["description"]}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "lightblue",
        flex: 1,
        alignContent: "center"
    },
    postTitle: {
        fontSize: 30,
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
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    }

})

export default PostScreen;