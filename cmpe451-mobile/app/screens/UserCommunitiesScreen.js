import React from 'react';
import { View , Text, StyleSheet, FlatList, Button } from 'react-native';


function UserCommunitiesScreen({navigation}) {
    const items = getUserCommunities();

    return (
        <View style={styles.background}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Users Communities</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    //keyExtractor={(item) => item.id}
                    data={items}
                    renderItem={({ item }) => (
                        <Button title={item.name}
                        style={styles.item}
                        onPress={() => navigation.navigate("Community", {communData:item})}/>
                    )}
                />
            </View>
        </View>
    );
}


// this should be an api call that returns a json like this.
function getUserCommunities(){
    return [{name: "mycom11"},
    {name: "mycom1"},
    {name: "comm3"},
    {name: "comm4"},
    {name: "comm5"},
    {name: "comm66"}
    ];
}   
const styles = StyleSheet.create({
    background:{
        backgroundColor: "dodgerblue",
        flex: 1,
        alignItems: "center"
    },
    titleContainer: {
        top: 40
    },
    title: {
        fontSize: 20,
        color: "white"
    },
    listContainer: {
        top: 50,
        alignItems: "center",
        backgroundColor: "white",
        width: "80%",
        height: "80%"
    
    },
    item: {
        fontSize: 20,
        padding: 5
    }
})

export default UserCommunitiesScreen;