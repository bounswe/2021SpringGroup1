import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import {axiosInstance} from "../service/axios_client_service";

function LoginScreen({navigation}) {
    const [name, setName] = React.useState('');
    const [pass, setPass] = React.useState('');

    return (
        <View style={styles.background}>
            <TextInput
                autoCapitalize="none"
                style={styles.textInput}
                placeholder="username"
                onChangeText={name => setName(name)}
            />
            <View style={{paddingBottom: 5}}/>
            <TextInput
                secureTextEntry
                style={styles.textInput}
                placeholder="password"
                onChangeText={pass => setPass(pass)}
            />
            <View style={{paddingBottom: 20}}/>
            <View style={styles.buttonView}>
                <Button title="Log in"
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
    const res = axiosInstance.post(
        'login', {'username': name, 'password': pass}
    );
    const data = (await  res).data;
    if(data["Success"]) {
        axiosInstance.defaults.headers.common['Authorization'] = 'Token ' + data["Token"];
    }
    return data;
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
        backgroundColor: "white",
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
        borderWidth: 0.7,
        padding: 10,
        backgroundColor: "white",
        borderColor: "gray"
    },
    buttonView: {
        backgroundColor: "rgb(77, 160, 240)",
        width: '50%',
        padding: 10,
    },
})

export default LoginScreen;