import React from 'react';
import { View , Text, StyleSheet, TextInput, Button, Alert} from 'react-native';

function RegisterScreen({navigation}) {
    const [name, setName] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [pass2, setPass2] = React.useState('');

    return (
        <View style={styles.background}>
            <Text style={styles.title}>Fill the form</Text>
            <Text style={styles.title}>Your unique username</Text>
            <TextInput 
                style={styles.textInput} 
                placeholder="enter your username"
                onChangeText={name => setName(name)}
                ></TextInput>

            <Text style={styles.title}>Your email address</Text>

            <TextInput
                style={styles.textInput} 
                placeholder="enter your email address"
                onChangeText={mail => setMail(mail)}
                ></TextInput>

            <Text style={styles.title}>Your password</Text>

            <TextInput
                style={styles.textInput} 
                placeholder="enter your password"
                onChangeText={pass => setPass(pass)}
                ></TextInput>

            <Text style={styles.title}>Confirm your password </Text>

            <TextInput 
                style={styles.textInput} 
                placeholder="enter your password"
                onChangeText={pass2 => setPass2(pass2)}
                ></TextInput>

            <Button 
                title="Register"
                color="blue"
                onPress={() => makeRegistration(name,mail,pass) ? Alert.alert("Registration","There is no registration check yet") : Alert.alert("Registration","failed") }
                />
        </View>
    );
}
// This needs an api call and before that, needs to make some checks:
// password match
// username and password length
// non special characters on username

function makeRegistration(username, email, password){
    if(username.length < 6 || email.length < 6 || password.length < 6){
        return false;
    }
    return true
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