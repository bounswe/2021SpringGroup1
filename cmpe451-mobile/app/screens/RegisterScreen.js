import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import {axiosInstance} from "../service/axios_client_service";

function RegisterScreen({navigation}) {
    const [name, setName] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [pass2, setPass2] = React.useState('');

    return (
        <View style={styles.background}>
            <TextInput
                autoCapitalize="none"
                style={styles.textInput}
                placeholder="unique username"
                onChangeText={name => setName(name)}
            />
            <View style={{paddingBottom: 5}}/>
            <TextInput
                autoCapitalize="none"
                style={styles.textInput}
                placeholder="email address"
                onChangeText={mail => setMail(mail)}
            />
            <View style={{paddingBottom: 5}}/>
            <TextInput secureTextEntry
                       style={styles.textInput}
                       placeholder="password"
                       onChangeText={pass => setPass(pass)}
            />
            <View style={{paddingBottom: 5}}/>
            <TextInput secureTextEntry
                       style={styles.textInput}
                       placeholder="confirm password"
                       onChangeText={pass2 => setPass2(pass2)}
            />
            <View style={{paddingBottom: 20}}/>
            <View style={styles.buttonView}>
                <Button
                    title="Register"
                    color="white"
                    onPress={() => makeRegistration(name, mail, pass, pass2)}
                />
            </View>
            <View style={{paddingBottom: 100}}/>
        </View>
    );
}

// This needs an api call and before that, needs to make some checks:
// password match
// username and password length
// non special characters on username

// const data = {foo:1, bar:2};

// fetch(`https://api.parse.com/1/users?foo=${encodeURIComponent(data.foo)}&bar=${encodeURIComponent(data.bar)}`, {
//   method: "GET",
//   headers: headers,   
// })


async function makeRegistration(name, mail, pass, pass2) {
    if (pass !== pass2) {
        Alert.alert("Can not register.", "The passwords do not match.");
        return false;
    }
    if (pass.length < 4) {
        Alert.alert("Can not register.", "The password is too short.");
        return false;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!reg.test(mail)) {
        Alert.alert("Can not register.", "Please enter a valid email address.");
        return false;
    }
    reg = /^\w[\w.]{2,18}\w$/;
    if (!reg.test(name)) {
        Alert.alert("Can not register.", "Please enter a valid username.");
        return false;
    }
    const response = await registerCall(name, mail, pass);
    //console.log(response)
    if (response["Success"]) {
        Alert.alert("Registration", "Registration Successful!");
        return true;
    }
    console.log(response);
    let userErrorMessage = ""
    let mailErrorMessage = ""
    let passErrorMessage = ""
    let message = "error"
    if (response["Message"].hasOwnProperty('username')) {
        userErrorMessage = "username: " + response["Message"]["username"][0] + "\n"
    }
    if (response["Message"].hasOwnProperty('email')) {
        mailErrorMessage = "email: " + response["Message"]["email"][0] + "\n"
    }
    if (response["Message"].hasOwnProperty('password')) {
        passErrorMessage = "password: " + response["Message"]["password"][0] + "\n"
    }

    message = userErrorMessage + mailErrorMessage + passErrorMessage
    Alert.alert("Registration Error", message)
    return false
}


async function registerCall(name,mail, pass) {
    var data = {
        'username': name,
        'email': mail,
        'password': pass
    }
    const res = axiosInstance.post(
        'register', data
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
    title: {
        fontSize: 20
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
        backgroundColor: "rgb(39, 84, 125)",
        width: '50%',
        padding: 10,
    },
})
export default RegisterScreen;