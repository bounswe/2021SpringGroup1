import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';

function RegisterScreen({navigation}) {
    const [name, setName] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [pass2, setPass2] = React.useState('');

    return (
        <View style={styles.background}>
            <Text style={styles.title}>Your unique username</Text>
            <TextInput
                style={styles.textInput}
                placeholder="enter your username"
                onChangeText={name => setName(name)}
            />

            <Text style={styles.title}>Your email address</Text>

            <TextInput
                style={styles.textInput}
                placeholder="enter your email address"
                onChangeText={mail => setMail(mail)}
            />

            <Text style={styles.title}>Your password</Text>

            <TextInput secureTextEntry
                       style={styles.textInput}
                       placeholder="enter your password"
                       onChangeText={pass => setPass(pass)}
            />

            <Text style={styles.title}>Confirm your password </Text>

            <TextInput secureTextEntry
                       style={styles.textInput}
                       placeholder="enter your password"
                       onChangeText={pass2 => setPass2(pass2)}
            />
            <View style={{paddingBottom: 10}}/>
            <View style={styles.buttonView}>
                <Button
                    title="REGISTER"
                    color="white"
                    onPress={() => makeRegistration(name, mail, pass)}
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


async function makeRegistration(name, mail, pass) {
    const response = await registerCall(name, mail, pass);
    //console.log(response)
    if (response["Success"]) {
        Alert.alert("Registration", "Registration Successful!")
        return true
    }
    console.log(response["Message"])
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

async function registerCall(name, mail, pass) {
    const res = await fetch('http://54.217.117.68:8000/api/v1/protopost/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: name,
            email: mail,
            password: pass
        })
    });
    return await res.json();
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
        backgroundColor: "dodgerblue",
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
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10
    },
    buttonView: {
        backgroundColor: "blue",
        width: '50%',
        padding: 10,
        borderRadius: 10
    },
})
export default RegisterScreen;