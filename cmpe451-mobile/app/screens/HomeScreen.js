import React from 'react';
import { View , Text, StyleSheet } from 'react-native';

function HomeScreen(props) {
    return (
        <View>
            <Text style={styles.title}>This will be your home page</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    title: {
        fontSize: 20
    }
})

export default HomeScreen;