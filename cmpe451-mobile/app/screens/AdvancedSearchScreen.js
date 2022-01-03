import React, {useEffect, useState} from 'react';
import {TextInput, RefreshControl, View, Text, StyleSheet, Button, FlatList, TouchableOpacity, ImageBackground, Image} from "react-native";
import {axiosInstance} from "../service/axios_client_service";
import SelectDropdown from 'react-native-select-dropdown'
function AdvancedSearchScreen({route, navigation}) {
    const {communityData} = route.params;
    console.log(communityData);
    const [templates, setTemplates] = React.useState([]);
    const [templateNames, setTemplateNames] = React.useState([]);
    const [currentTemplate, setCurrentTemplate] = React.useState([]);
    useEffect(() => {
        getCommunityTemplates();
    }, []
    );

    const getCommunityTemplates = () => {
        let uri = 'communities/' + communityData["id"] + '/list_post_templates';
        axiosInstance.get(uri, {}).then(async response => {
            if (response.status === 200) {
                //console.log("getting comm posts success!");
                const template_array = response.data.Post_templates;
                let temp_names = [];
                for(let i = 0; i<template_array.length; i++){
                    temp_names.push(template_array[i]["name"]);
                }
                setTemplates(response.data.Post_templates);
                setTemplateNames(temp_names);
                console.log(temp_names);
            }
        })
    }

    const getTemplateFields = (fieldName) => {
        let current_template = [];
        for(let i = 0; i<templates.length; i++){
            if(fieldName === templates[i]["name"]){
                current_template = templates[i];
                break;
            }
        }
        console.log(current_template["data_field_templates"]);
        setCurrentTemplate(current_template["data_field_templates"]);
    }

    return (
        <View style={styles.background}> 
            <SelectDropdown
                style={styles.dropdown}
                data={templateNames}
                onSelect={(selectedItem, index) => {
                    getTemplateFields(selectedItem);
        
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
            />

            <View style={styles.listContainer}>
                {currentTemplate.filter(item=>item.type==="text").map((input) => (
                    <View style={styles.textContainer}>
                        <Text style={styles.contentTitle}>{input.name}</Text>
                    </View>
                ))}

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "lightblue",
        flex: 1,
        alignItems: "center"
    },
    dropdown:{
        width: "90%"
    },
    flatList: {
        width: "100%"
    },
    listContainer: {
        alignItems: "center",
        backgroundColor: "rgb(39, 84, 125)",
        width: "90%",
        flex:6,
    },
    textContainer:{
        alignItems: "center",
        paddingHorizontal: 50,
        paddingVertical: 10
    },
    contentTitle:{
        color:"white"
    }
})

export default AdvancedSearchScreen;