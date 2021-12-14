import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Button, FlatList, TouchableOpacity} from "react-native";
import {axiosInstance} from "../service/axios_client_service";
import SelectDropdown from 'react-native-select-dropdown'

function CreatePostScreen({ route, navigation }) {
    const { community } = route.params;
    const[templates,setTemplates] = useState([]);
    const[names,setNames] = useState([]);
    const[target,setTarget] = useState();

    const dropdownData = [];

    useEffect(() => {
        getCommunityTemplates();
    }, []
    );
    useEffect(() => {
        getDropdownList();
    }, []
    );
    const getCommunityTemplates = () => {
        let uri = 'communities/' + community + '/list_post_templates';
        axiosInstance.get(uri, {}).then(async response => {
            if (response.status === 200) {
                //console.log("getting comm posts success!");
                setTemplates(response.data);
            }
        })
    }

    const getDropdownList = () => {
        let uri = 'communities/' + community + '/list_post_templates';
        axiosInstance.get(uri, {}).then(async response => {
            if (response.status === 200) {
                //console.log("getting comm posts success!");
                const temps = response.data;
                for(let i = 0; i < temps["Post_templates"].length; i++){
                    let tempname = temps["Post_templates"][i]["name"];
                    dropdownData.push(tempname);
                }
                // console.log(templates);
                // console.log("aaaaaaaa");
                // console.log(dropdownData);
                setNames(dropdownData);
            }
        })

    }



    return (
        <View>
           <SelectDropdown
            data={names}
            onSelect={(selectedItem, index) => {
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
        
        </View>
        
    );
}

function findTemplate(name,templates) {
    for(let i = 0; i<templates["Post_templates"].length; i++){
        if(templates["Post_templates"][i]["name"] === name){
            return templates["Post_templates"][i];
        }
    }
    return {};

}

export default CreatePostScreen;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });