import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";

function ProfileScreen(props) {
    return (
        <View style={styles.background}>
            <Text style={styles.titleStyle}>Profile</Text>

            <Text style={styles.fieldText}>Your username</Text>
            <TextInput
                autoCapitalize="none"
                style={styles.textInput}
                placeholder="username"
                //onChangeText={name => setName(name)}
            />
            <Text style={styles.fieldText}>Your Full name</Text>
            <TextInput
                style={styles.textInput}
                placeholder="full name"
                //onChangeText={pass => setPass(pass)}
            />
            <Text style={styles.fieldText}>Your mail address</Text>
            <TextInput
                style={styles.textInput}
                placeholder="address"
                //onChangeText={pass => setPass(pass)}
            />
            <Text style={styles.fieldText}>Your bio</Text>
            <TextInput
                style={styles.textInput}
                placeholder="full name"
                //onChangeText={pass => setPass(pass)}
            />
            <Text style={styles.fieldText}>Your birthday</Text>
            <TextInput
                style={styles.textInput}
                placeholder="full name"
                //onChangeText={pass => setPass(pass)}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.saveButton}
                    //onPress={() => checkCredential(name, pass, navigation)}
                >
                    <Text style={styles.saveText}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
        
    },
    titleStyle: {
        fontSize: 30,
        paddingTop: 10,
        paddingBottom:10
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
    fieldText: {
        fontSize: 20
    },
    buttonContainer: {
        backgroundColor: "rgb(77, 160, 240)",
        width: '50%',
        height: 40,
        padding: 10,
    },
    saveButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    saveText: {
        color: "white",
        fontSize: 20
    }
})

export default ProfileScreen;