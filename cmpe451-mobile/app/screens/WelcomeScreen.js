import React from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, View} from 'react-native';

function WelcomeScreen({ navigation }) {
    const lightBlue = 'rgb(77, 160, 240)'
    const midBlue = 'rgb(61, 130, 195)'
    const darkBlue = 'rgb(39, 84, 125)'

    return (
        <View 
        style={styles.background}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={{uri: "https://allisonpastordesigns.com/wp-content/uploads/2018/09/pp-logo-blue-03.png"}} />
                <Text style={styles.title}>Protopost</Text>
            </View>
            <View style={styles.loginButton}>
                <Button
                    title="Log in"
                    color="dodgerblue"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
            <View style={styles.registerButton}>
                <Button
                    title="Register"
                    color="darkblue"
                    onPress={() => navigation.navigate('Register')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "white"
        
    },
    loginButton: {
        width: "100%",
        height: 70,
        backgroundColor: "rgb(77, 160, 240)",
        justifyContent: "center"
    },
    registerButton: {
        width: "100%",
        height: 70,
        backgroundColor: "rgb(39, 84, 125)",
        justifyContent: "center"
    },
    logo: {
        width: 100,
        height: 100
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center"
    },
    title: {
        fontSize: 40,
        color: "rgb(39, 84, 125)",
        fontWeight: "700"
    },
})

export default WelcomeScreen;