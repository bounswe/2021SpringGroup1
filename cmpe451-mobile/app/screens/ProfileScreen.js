import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from "react-native";
import {IconButton} from "react-native-paper";
import {axiosInstance, user_id, user_name} from "../service/axios_client_service";
import ViewabilityHelper from "react-native-web/dist/vendor/react-native/ViewabilityHelper";


function ProfileScreen({navigation}) {
    const default_profile_picture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";

    const [profileData, changeProfileData] = React.useState({
        last_name: "",
        first_name: "",
        profile_picture: ""
    });

    function getProfileData() {
        axiosInstance.get('get_user_profile', {params: {user_id: user_id}}).then(async response => {
            if (response.status === 200) {
                changeProfileData(response.data["User"]);
                //console.log(profileData.profile_picture)
            }
        })
    }

    useEffect(() => {
            getProfileData();
        }, []
    );

    return (


        <View style={{flexDirection: "row", backgroundColor: "white"}}>

            <View style={styles.background}>

                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={styles.titleStyle}>                    Profile  </Text>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: default_profile_picture}} style={styles.itemImage}/>
                    </View>
                </View>

                <Text style={styles.fieldText}>Your username</Text>
                <Text style={styles.fieldText}>{profileData.username}</Text>

                <Text style={styles.fieldText}>Your Full name</Text>
                <Text style={styles.fieldText}>{profileData.first_name} {profileData.last_name}</Text>

                <Text style={styles.fieldText}>Your mail address</Text>
                <Text style={styles.fieldText}>{profileData.email}</Text>


            </View>
            <IconButton
                icon="pencil"
                size={30}
                onPress={() => {
                    navigation.navigate("Edit Profile")
                }}
            />
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
        paddingBottom: 10,
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
    },
    imageContainer: {
        flex: 3,
        paddingRight: 5,
    },
    itemImage: {
        width: 40,
        height: 40
    },
})

export default ProfileScreen;