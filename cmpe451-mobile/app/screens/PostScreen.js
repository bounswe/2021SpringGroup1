import React from 'react';
import {View, Text, StyleSheet,ScrollView, Image} from 'react-native';
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps';
import { Video, AVPlaybackStatus } from 'expo-av';
import { WebView } from 'react-native-webview';

function PostScreen({route, navigation}) {
    const {postData} = route.params;
    console.log("asdasdasdasdas");
    console.log(postData);
    return (
        <ScrollView style={styles.background}>
            <Text style={styles.postTitle}>{postData["title"]}</Text>
            {postData["data_fields"].filter(item=>item.type==="text").map((input) => (
                <View style={styles.textContainer}>
                    <Text style={styles.contentTitle}>{input.name}</Text>
                    <Text style={styles.contentText}>{input.content.prop1}</Text>
                </View>
            ))}

            {postData["data_fields"].filter(item=>item.type==="number").map((input) => (
                <View style={styles.textContainer}>
                    <Text style={styles.contentTitle}>{input.name}</Text>
                    <Text style={styles.contentText}>{input.content.prop1}</Text>
                </View>
            ))}

            {postData["data_fields"].filter(item=>item.type==="image").map((input) => (
                <View style={styles.imageContainer}>
                    <Text style={styles.contentTitle}>{input.name}</Text>
                    <Image style={styles.contentImage} source={{uri:input.content.prop1}}/>
                </View>
            ))}

            {postData["data_fields"].filter(item=>item.type==="video").map((input) => (
                <View style={styles.textContainer}>
                    <Text style={styles.contentTitle}>{input.name}</Text>
                    <View style={styles.video}>
                        <WebView
                        style={{flex:1}}
                        javaScriptEnabled={true}
                        source={{uri: input.content.prop1}}
                        />
                    </View>
                </View>
            ))}



            {postData["data_fields"].filter(item=>item.type==="date").map((input) => (
                <View style={styles.dateContainer}>
                    <Text style={styles.contentTitle}>{input.name}</Text>
                    <Text style={styles.contentText}>{isoDateConvert(input.content.prop1)}</Text>
                </View>
            ))}
            
            {postData["data_fields"].filter(item=>item.type==="location").map((input) => (
                <View style={styles.dateContainer}>
                    <Text style={styles.contentTitle}>{input.name}</Text>
                    <Text style={styles.contentText}>{input.content.adrs}</Text>
                    <View style={styles.mapStyle}>
                        <MapView style={styles.map} 
                            region={{
                            latitude:input.content.marker.lat,
                            longitude:input.content.marker.lng,
                            latitudeDelta: 0.03,
                            longitudeDelta: 0.1}}
                        >
                            <Marker coordinate={{
                            latitude:input.content.marker.lat,
                            longitude:input.content.marker.lng,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.1}} title='Marker'/>
                        </MapView>
                    </View>
                </View>
            ))}

            <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}
            />
            <View style={styles.detailList}>
                <Text style={styles.postDetail}>posted by: {postData["poster_name"]}</Text>
                <View style={{paddingLeft: 10, padding: 10}}/>
                <Text style={styles.postDetail}>{isoDateConvert(postData["created_date"])} | {postData["created_date"].substring(11,16) }</Text>
            </View>
            <Text style={styles.postDescription}>{postData["description"]}</Text>

        </ScrollView>
    );
}

function isoDateConvert(input){
    const time = new Date(input);
    return time.toDateString();
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
    textContainer: {
        alignItems: "center",
        paddingHorizontal: 50,
        paddingVertical: 10
    },
    imageContainer: {
        alignItems: "center",
        padding: 3
    },
    dateContainer: {
        alignItems: "center",
        paddingBottom: 10
    },
    contentTitle:{
        fontSize: 30,
        paddingVertical:5
    },
    contentText: {
        fontSize:20,
        padding:2
    },
    contentImage: {
        width: 300,
        height: 200,
        resizeMode: 'stretch',
    },
    mapStyle: {
        width:"90%",
        height:250
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 300,
      },


})

export default PostScreen;