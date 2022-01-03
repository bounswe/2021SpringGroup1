import React, {useEffect, useState} from 'react';
import {TextInput, RefreshControl, View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert} from "react-native";
import {axiosInstance} from "../service/axios_client_service";
import SelectDropdown from 'react-native-select-dropdown'
import DatePicker from 'react-native-datepicker';

function CreatePostScreen({route, navigation}) {
    const [date, setDate] = useState('09-10-2021');
    const {communityData} = route.params;
    console.log(communityData);
    const [title, setTitle] = React.useState("");
    const [templates, setTemplates] = React.useState([]);
    const [templateNames, setTemplateNames] = React.useState([]);
    const [currentTemplate, setCurrentTemplate] = React.useState([]);
    const [currentName, setCurrentName] = React.useState("");

    const [textDataFields, setTextDataFields] = useState([]);
    const [numberDataFields, setNumberDataFields] = useState([]);
    const [imageDataFields, setImageDataFields] = useState([]);
    const [dateDataFields, setDateDataFields] = useState([]);
    const [videoDataFields, setVideoDataFields] = useState([]);

    const updateField = (fieldType, value, key) => {
      if(fieldType === "text"){
        const _dataFields = [...textDataFields];
        // _dataFields[key].name = text;
        // _dataFields[key].type = fieldType;
        // _dataFields[key].key = key;
        _dataFields[key].value = value;
        setTextDataFields(_dataFields);
      }
      else if (fieldType === "number"){
        const _dataFields = [...numberDataFields];
        // _dataFields[key].name = text;
        // _dataFields[key].type = fieldType;
        // _dataFields[key].key = key;
        _dataFields[key].value = value;
        setNumberDataFields(_dataFields);
      }
      else if (fieldType === "image"){
        const _dataFields = [...imageDataFields];
        // _dataFields[key].name = text;
        // _dataFields[key].type = fieldType;
        // _dataFields[key].key = key;
        _dataFields[key].url = value;
        setImageDataFields(_dataFields);
      }
      else if (fieldType === "date"){
        let dateText = value;
        dateText = dateText.replace("/","-");
        dateText = dateText.replace("/","-");
        dateText = dateText + "T00:00:00.000Z";
        console.log(dateText);
        const _dataFields = [...dateDataFields];
        // _dataFields[key].name = text;
        // _dataFields[key].type = fieldType;
        // _dataFields[key].key = key;
        _dataFields[key].value = dateText;
        setDateDataFields(_dataFields);
      }
      else if (fieldType === "video"){
        const _dataFields = [...videoDataFields];
        // _dataFields[key].name = text;
        // _dataFields[key].type = fieldType;
        // _dataFields[key].key = key;
        _dataFields[key].url = value;
        setVideoDataFields(_dataFields);
      }

    };

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
                setTemplates(template_array);
                setTemplateNames(temp_names);
                setFullTemplateInfo(response.data);
            }
        })
    };

    const getTemplateFields = (fieldName) => {

        let current_template = [];
        for(let i = 0; i<templates.length; i++){
            if(fieldName === templates[i]["name"]){
                current_template = templates[i];
                break;
            }
        }
        setCurrentTemplate(current_template["data_field_templates"]);
        console.log("current template starts");
        console.log(currentTemplate);
        console.log("current template ends");
        let textTemplateFields = [];
        let numberTemplateFields = [];
        let imageTemplateFields = [];
        let dateTemplateFields = [];
        let videoTemplateFields = [];
        for(let i = 0; i<currentTemplate.length; i++){
          if (currentTemplate[i]["type"] === "image"){
            imageTemplateFields.push({ key: '', type: currentTemplate[i]["type"], name: currentTemplate[i]["name"], url: '' });
          }
          else if(currentTemplate[i]["type"] === "text"){
            textTemplateFields.push({ key: '', type: currentTemplate[i]["type"], name: currentTemplate[i]["name"], value: '' });
          }
          else if (currentTemplate[i]["type"] === "number") {
            numberTemplateFields.push({ key: '', type: currentTemplate[i]["type"], name: currentTemplate[i]["name"], value: '' });
          }      
          else if (currentTemplate[i]["type"] === "date"){
            dateTemplateFields.push({ key: '', type: currentTemplate[i]["type"], name: currentTemplate[i]["name"], value: '' });
          }   
          else if (currentTemplate[i]["type"] === "video"){
            videoTemplateFields.push({ key: '', type: currentTemplate[i]["type"], name: currentTemplate[i]["name"], url: '' });
          }    
        }
        setTextDataFields(textTemplateFields);
        setNumberDataFields(numberTemplateFields);
        setImageDataFields(imageTemplateFields);
        setDateDataFields(dateTemplateFields);
        setVideoDataFields(videoTemplateFields);
        
    };

    return (
        <View style={styles.background}> 
            <SelectDropdown
                style={styles.dropdown}
                data={templateNames}
                onSelect={(selectedItem, index) => {
                    setCurrentName(selectedItem);
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

            <ScrollView style={styles.listContainer}>
                <Text style={styles.contentTitle}>Post Title</Text>
                <TextInput
                          style={styles.fieldTextInput}
                          placeholder="Enter post title"
                          onChangeText={title => setTitle(title)}
                />
                {textDataFields.map((input, key) => (
                    <View style={styles.textContainer}>
                        <Text style={styles.contentTitle}>{input.name}</Text>
                        <TextInput
                          style={styles.fieldTextInput}
                          placeholder={'Enter ' + input.type + ' field value'}
                          onChangeText={text => updateField(input.type, text, key)}
                        />
                    </View>
                ))}

                {numberDataFields.map((input, key) => (
                    <View style={styles.textContainer}>
                        <Text style={styles.contentTitle}>{input.name}</Text>
                        <TextInput
                          style={styles.fieldTextInput}
                          keyboardType = 'numeric'
                          placeholder={'Enter ' + input.type + ' field value'}
                          onChangeText={number => updateField(input.type, number, key)}
                        />
                    </View>
                ))}

                {imageDataFields.map((input, key) => (
                    <View style={styles.textContainer}>
                        <Text style={styles.contentTitle}>{input.name}</Text>
                        <TextInput
                          style={styles.fieldTextInput}
                          placeholder={'Enter ' + input.type + ' field url'}
                          onChangeText={text => updateField(input.type, text, key)}
                        />
                    </View>
                ))}
                {videoDataFields.map((input, key) => (
                    <View style={styles.textContainer}>
                        <Text style={styles.contentTitle}>{input.name}</Text>
                        <TextInput
                          style={styles.fieldTextInput}
                          placeholder={'Enter ' + input.type + ' field url'}
                          onChangeText={text => updateField(input.type, text, key)}
                        />
                    </View>
                ))}
                {dateDataFields.map((input, key) => (
                    <View style={styles.textContainer}>
                        <Text style={styles.contentTitle}>{input.name}</Text>
                        <DatePicker
                          style={styles.datePickerStyle}
                          date={date}
                          mode="date"
                          placeholder="select date"
                          format="YYYY/MM/DD"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"

                          customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              right: -5,
                              top: 4,
                              marginLeft: 0,
                            },
                            dateInput: {
                              borderColor : "gray",
                              alignItems: "flex-start",
                              borderWidth: 0,
                              borderBottomWidth: 1,

                            },
                            placeholderText: {
                              fontSize: 17,
                              color: "gray"
                            },
                            dateText: {
                              fontSize: 17,
                            }
                          }}
                          onDateChange={(date) => {
                            setDate(date);
                            updateField(input.type, date, key);
                          }}
                        />
                    </View>
                ))}

            </ScrollView>
            <View style= {styles.buttonContainer}>
              <TouchableOpacity style={styles.loginButton}
              onPress={()=>createPost(textDataFields, numberDataFields, imageDataFields, dateDataFields,videoDataFields, title, currentName, communityData, templates)}>
                <Text style={styles.loginText}>Create Post</Text>
              </TouchableOpacity>
            </View>
        </View>
    );
}

async function createPost(textFields, numberFields, imageFields, dateFields,videoFields, postTitle, templateName, commData, templateInfo){
  // console.log(dataFields);
  console.log(postTitle);
  console.log(templateName);
  console.log(commData);
  console.log(templateInfo);

  let id = 0;
  for(let i = 0; i<templateInfo.length; i++){
    if(templateInfo[i]["name"] === templateName){
        id = templateInfo[i]["id"];
        break;
    }
  }
  console.log(id);
  console.log(textFields);
  let postDataFields = [];
  for(let i = 0; i<textFields.length; i++){
    let data = {name: textFields[i]["name"], type: "text", content: {
      value: textFields[i]["value"]
      }
    };
    postDataFields.push(data);
  }

  for(let i = 0; i<numberFields.length; i++){
    let data = {name: numberFields[i]["name"], type: "number", content: {
      value: parseInt(numberFields[i]["value"])
      }
    };
    postDataFields.push(data);
  }
  for(let i = 0; i<imageFields.length; i++){
    let data = {name: imageFields[i]["name"], type: "image", content: {
      url: imageFields[i]["url"]
      }
    };
    postDataFields.push(data);
  }

  for(let i = 0; i<dateFields.length; i++){
    let data = {name: dateFields[i]["name"], type: "date", content: {
      value: dateFields[i]["value"]
      }
    };
    postDataFields.push(data);
  }
  for(let i = 0; i<videoFields.length; i++){
    let data = {name: videoFields[i]["name"], type: "video", content: {
      url: videoFields[i]["value"]
      }
    };
    postDataFields.push(data);
  }

  const postData = {title: postTitle, post_template: id, data_fields: postDataFields };
  let uri = 'communities/' + commData["id"] + '/create_post';

  const response = await createPostCall(uri, postData);
  if (response.data["Success"]) {
    Alert.alert("Post Create", "Post Creation Successful!");
    return true;
  }
  else{
    Alert.alert("Post Create", "Post Creation Failed");
    console.log(response.data);
    return false;
  }
}

async function createPostCall(url, sendData) {
  console.log("here");
  console.log(sendData);
  console.log("not here");
  const res = axiosInstance.post(
    url, sendData
  );
  return res;
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
        backgroundColor: "white",
        width: "90%",
        flex:6,
    },
    textContainer:{
        alignItems: "center",
        paddingHorizontal: 50,
        paddingVertical: 10
    },
    contentTitle:{
        color:"black",
        fontSize:20,
        alignSelf: "center"
    },
    fieldTextInput: {
      width: "90%",
      textAlign: "center",
      fontSize: 20,
      alignSelf: "center"
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
  buttonContainer: {
    backgroundColor: "rgb(77, 160, 240)",
    width: '50%',
    height: 70,
    padding: 10,
  },
})

export default CreatePostScreen;