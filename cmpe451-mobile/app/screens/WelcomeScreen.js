import React from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, View} from 'react-native';

function WelcomeScreen({ navigation }) {
    return (
        <ImageBackground source={require("../assets/background.jpg")}
        style={styles.background}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/favicon.png")} />
                <Text>React Tutorial</Text>
            </View>
            <View style={styles.loginButton}>
                <Button
                    title="Log in"
                    color="red"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
            <View style={styles.registerButton}>
                <Button
                    title="Register"
                    color="blue"
                    onPress={() => navigation.navigate('Register')}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    loginButton: {
        width: "100%",
        height: 70,
        backgroundColor: "#fc5c65",
        justifyContent: "center"
    },
    registerButton: {
        width: "100%",
        height: 70,
        backgroundColor: "dodgerblue",
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
    }
})

export default WelcomeScreen;