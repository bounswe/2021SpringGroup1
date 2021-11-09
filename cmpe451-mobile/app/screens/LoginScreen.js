import React from 'react';
import { Button, View , Text, StyleSheet, TextInput} from 'react-native';

function LoginScreen({navigation}) {
    return (
        <View style={styles.background}>
            <Text style={styles.title}>Your email address</Text>
            <TextInput style={styles.textInput}></TextInput>
            <Text style={styles.title}>Your password</Text>
            <TextInput style={styles.textInput}></TextInput>
            <Button title="Log in"
                    color="blue"
                    onPress={() => navigation.navigate("Home")}/>
        </View>
    );
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
        backgroundColor: "white",
        
    }

})

export default LoginScreen;