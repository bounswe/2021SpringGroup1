import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View , Text, StyleSheet, TextInput, Alert} from 'react-native';

function LoginScreen({navigation}) {
    const [name, setName] = React.useState('');
    const [pass, setPass] = React.useState('');

    return (
        <View style={styles.background}>
            <Text style={styles.title}>Your username</Text>
            <TextInput 
                style={styles.textInput} 
                placeholder="enter your username"
                onChangeText={name => setName(name)}
                ></TextInput>
            <Text style={styles.title} >Your password</Text>
            <TextInput 
                style={styles.textInput}
                placeholder="enter your password"
                onChangeText={pass => setPass(pass)}
                ></TextInput>
            <Button title="Log in"
                    color="blue"
                    onPress={() => checkCredential(name,pass) ? navigation.navigate("Home") : Alert.alert("Login","failed")}/>
        </View>
    );
}

// this function should make an api call in the future
function checkCredential(username,password){
    if (username === "A" && password === "B"){
        return true;
    }
    return false;
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fc5c65",
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
        backgroundColor: "white"        
    }

})

export default LoginScreen;