import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert} from "react-native";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import MapView, {Marker} from "react-native-maps";
import {IconButton} from "react-native-paper";
import * as Location from "expo-location";


function LocationPickerScreen({route, navigation}) {

    const [location, setLocation] = useState({"coords": {"latitude":41.0857609,"longitude":29.0427245}});
    const [markerLocation, setMarkerLocation] = useState({"coords": {"latitude":41.0857609,"longitude":29.0427245}});
    const [address, setAddress] = useState("");

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Post Create", "Post Creation Failed");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const onMapPressed = (e) =>{
        let loc = {"coords" : {"latitude":41.0857609,"longitude":29.0427245}}
        loc.coords = e.nativeEvent.coordinate
        setMarkerLocation(loc)
        Location.reverseGeocodeAsync(loc.coords).then(res => {
            let adr = ""
            res = res[0]
            console.log(res)
            adr += res.district + ", " + res.name + ", " + res.postalCode + " " + res.subregion + "/" + res.region + ", " + res.country
            setAddress(adr)
            console.log(adr)
        })
    }

    return (
        <View style={styles.background}>
            <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}
            query={{
                key: 'AIzaSyCf_p-OgSi77VGJ4vZGd56vDp4ni3SNMLM',
                language: 'en',
            }}
        />
            <Text style={styles.contentTitle}>Name</Text>

                <View style={styles.mapStyle}>
                    <MapView style={styles.map}
                             region={{
                                 latitude:location.coords.latitude,
                                 longitude:location.coords.longitude,
                                 latitudeDelta: 0.03,
                                 longitudeDelta: 0.1}}
                             onPress={onMapPressed}
                    >
                        <Marker coordinate={{
                            latitude:markerLocation.coords.latitude,
                            longitude:markerLocation.coords.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.1}} title='Marker'/>
                    </MapView>
                </View>
                <IconButton
                    icon="check"
                    size={20}
                    onPress={() => {
                        let val = {marker: {lat: markerLocation.coords.latitude, lng: markerLocation.coords.longitude}, address: address}
                        //updateField(input.type, val, key)
                    }}
                />

        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "lightblue",
        flex: 6,
        alignItems: "center",
        width: 300
    },
    titleStyle: {
        fontSize: 30,
        paddingTop: 10,
        paddingBottom: 10,
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    mapStyle: {
        width:"90%",
        height:250
    },
})

export default LocationPickerScreen;