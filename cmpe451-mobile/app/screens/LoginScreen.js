import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import {axiosInstance} from "../service/axios_client_service";

function LoginScreen({navigation}) {
    const [name, setName] = React.useState('');
    const [pass, setPass] = React.useState('');

    return (
        <View style={styles.background}>
            <Text style={styles.title}>Username:</Text>
            <TextInput
                style={styles.textInput}
                placeholder="enter your username"
                onChangeText={name => setName(name)}
            />
            <Text style={styles.title}>Password:</Text>
            <TextInput
                secureTextEntry
                style={styles.textInput}
                placeholder="enter your password"
                onChangeText={pass => setPass(pass)}
            />
            <View style={{paddingBottom: 10}}/>
            <View style={styles.buttonView}>
                <Button title="LOG IN"
                        color="white"
                        onPress={() => checkCredential(name, pass, navigation)}/>
            </View>
            <View style={{paddingBottom: 200}}/>
        </View>

    );
}

// this function should make an api call in the future
//  checkCredential(name,pass) ? navigation.navigate("Home") : Alert.alert("Login","failed")
//      ? navigation.navigate("Home") : Alert.alert("Login","failed")
async function checkCredential(username, password, navigation) {
    console.log(username);
    const response = await loginCall(username, password);
    console.log(response);
    if (response["Success"]) {
        navigation.navigate("Home");
    } else {
        Alert.alert("Can not log in.", "Please check your username or password.");
    }
    return true
}

async function loginCall(name, pass) {
    //const uri = 'http://54.217.117.68:8000/api/v1/protopost/login?password=' + pass + "&username=" + name
    //console.log(uri)
    //f2c2e43d816a5668da7f7c9bc54c8a7dd1f5be3f
    const res = axiosInstance.get(
        'login', {
            params: {
                username: name,
                password: pass
            },
            withCredentials: true
        }
    );
    console.log((await res).data);
    return (await res).data;
}

// const data = {foo:1, bar:2};

// fetch(`https://api.parse.com/1/users?foo=${encodeURIComponent(data.foo)}&bar=${encodeURIComponent(data.bar)}`, {
//   method: "GET",
//   headers: headers,   
// })

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fc5c65",
        justifyContent: "center",
        alignItems: "center"
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
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
    },
    buttonView: {
        backgroundColor: "blue",
        width: '50%',
        padding: 10,
        borderRadius: 10
    },
})

export default LoginScreen;