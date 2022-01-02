import React from 'react';

import {Button, View} from "react-native";

function SettingsScreen({navigation}) {
    return (
        <View>
            <Button 
                title="Log out"
                onPress={ ()=> navigation.navigate("Welcome")} />
        </View>
    );
}

export default SettingsScreen;