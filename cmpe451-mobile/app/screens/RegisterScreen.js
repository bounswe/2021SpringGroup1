import React from 'react';
import { View , Text, StyleSheet, TextInput, Button, Alert} from 'react-native';

function RegisterScreen({navigation}) {
    return (
        <View style={styles.background}>
            <Text style={styles.title}>Fill the form</Text>
            <Text style={styles.title}>Your unique username</Text>
            <TextInput style={styles.textInput}></TextInput>
            <Text style={styles.title}>Your email address</Text>
            <TextInput style={styles.textInput}></TextInput>
            <Text style={styles.title}>Your password</Text>
            <TextInput style={styles.textInput}></TextInput>
            <Text style={styles.title}>Confirm your password </Text>
            <TextInput style={styles.textInput}></TextInput>

            <Button 
                title="Register"
                color="blue"
                onPress={() => Alert.alert("Registration","There is no registration check yet") }
                />
            <Button 
                title="Go to Login Page"
                color="blue" 
                onPress={() => navigation.navigate('Login')}
                />
        </View>
    );
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
        
    }

})
export default RegisterScreen;