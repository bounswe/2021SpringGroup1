import React from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

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
            <View style={styles.loginContainer}>
                <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.loginText}>LOG IN</Text>
                    </TouchableOpacity>
            </View>
            <View style={styles.registerContainer}>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.registerText}>REGISTER</Text>
                </TouchableOpacity>
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
    loginContainer: {
        width: "100%",
        height: 70,
        backgroundColor: "rgb(77, 160, 240)",
        justifyContent: "center"
    },
    loginButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loginText: {
        color: "white",
        fontSize: 20
    },
    registerContainer: {
        width: "100%",
        height: 70,
        backgroundColor: "rgb(39, 84, 125)",
        justifyContent: "center"
    },
    registerButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    registerText: {
        color: "white",
        fontSize: 20
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