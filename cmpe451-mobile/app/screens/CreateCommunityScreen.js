import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity} from 'react-native';
import {axiosInstance} from "../service/axios_client_service";

function CreateCommunityScreen(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [url, setUrl] = React.useState('');


    return (
        <View style={styles.background}>
            <Text style={styles.titleStyle}>Create Your Own Community</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Community name"
                onChangeText={name => setName(name)}
            />
            <View style={{paddingBottom: 5}}/>
            <TextInput
                style={styles.textInput}
                placeholder="description"
                onChangeText={description => setDescription(description)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="community image url"
                onChangeText={url => setUrl(url)}
            />
            <View style={{paddingBottom: 20}}/>
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.createButton}
                onPress={() => createComm(name, description, url)}>
                    <Text style={styles.createText}>CREATE COMMUNITY</Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingBottom: 200}}/>
        </View>

    );
}

async function createComm(name, description, url) {
    console.log(name);
    const response = await commCall(name, description, url);
    console.log(response);
    if (response["Success"]) {
        Alert.alert("Success", "Community Creation Successful!");
        return true

    } else {
        const result = response["Error"];
        console.log(result);
        let errormessage = "";
        if(result.hasOwnProperty("name")){
            errormessage = "Community name: " + result["name"] + "\n";
        }
        if(result.hasOwnProperty("description")){
            errormessage = errormessage + "Community description: " + result["description"];
        }
        Alert.alert("Failure", errormessage);
        return false
    }
}

async function commCall(name, description, url) {
    var data = {
        'name': name,
        'description': description,
        'community_image_url' : url
    }
    const res = axiosInstance.post(
        'create_community', data
    );
    console.log((await res).data);
    return (await res).data;
}


const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    titleStyle: {
        fontSize: 30,
        paddingBottom:30
    }, 
    title: {
        fontSize: 20,
        color: "white"
    },
    textInput: {
        width: "80%",
        height: 50,
        margin: 10,
        fontSize: 20,
        borderWidth: 0.7,
        padding: 10,
        backgroundColor: "white",
        borderColor: "gray"
    },
    buttonView: {
        backgroundColor: "rgb(77, 160, 240)",
        width: '50%',
        height: 70,
        padding: 10,
    },
    createButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    createText:{
        fontSize:20,
        color:"white"
    }
})

export default CreateCommunityScreen;