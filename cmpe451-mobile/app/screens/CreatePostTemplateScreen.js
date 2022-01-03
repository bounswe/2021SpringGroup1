import React, { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet,TextInput,ScrollView, Alert, TouchableOpacity} from "react-native";
import { axiosInstance } from "../service/axios_client_service";

function CreatePostTemplateScreen({ route, navigation }) {
  const { community } = route.params;
  //console.log(community);

  const [name, setName] = React.useState('');
  const [dataFields, setDataFields] = useState([]);

  const textFieldKey = 'text';
  const dateFieldKey = 'date';
  const locationFieldKey = 'location';
  const imageFieldKey = 'image';
  const numberFieldKey = 'number';
  const videoFieldKey = 'video';

  const addField = fieldType => {
    const _dataFields = [...dataFields];
    _dataFields.push({ key: '', type: fieldType, name: '' });
    setDataFields(_dataFields);
  };

  const deleteField = (key) => {
    const _dataFields = dataFields.filter((input, index) => index !== key);
    setDataFields(_dataFields);
  };

  const updateField = (fieldType, text, key) => {
    const _dataFields = [...dataFields];
    _dataFields[key].name = text;
    _dataFields[key].type = fieldType;
    _dataFields[key].key = key;
    setDataFields(_dataFields);
  };

  return (
    <View style={styles.background}
    >
      <ScrollView
        style={styles.scrollView}>

        <View style={styles.templateNameContainer}
        >
          <TextInput
            style={styles.templateNameInput}
            onChangeText={Name => setName(Name)}
            placeholder="Post Template Name"
          />
          <TouchableOpacity style={styles.createButton}
          onPress={() => createPostTemplate(dataFields, name, community)}
          >
          <Text style={styles.createText}>Create Post Template</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.addFieldContainer}>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.addField}
            onPress={() => addField(textFieldKey)}>
              <Text style={styles.addFieldText}>Text Field</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.addField}
            onPress={() => addField(dateFieldKey)}>
              <Text style={styles.addFieldText}>Date Field</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.addField}
            onPress={() => addField(numberFieldKey)}>
              <Text style={styles.addFieldText}>Number Field</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.addFieldContainer}>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.addField}
            onPress={() => addField(locationFieldKey)}>
              <Text style={styles.addFieldText}>Location Field</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.addField}
            onPress={() => addField(imageFieldKey)}>
              <Text style={styles.addFieldText}>Image Field</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.addField}
            onPress={() => addField(videoFieldKey)}>
              <Text style={styles.addFieldText}>Video Field</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
        {dataFields.map((input, key) => (
          <View style={styles.nameFieldContainer}
          >
            <TextInput
              style={styles.fieldTextInput}
              placeholder={'Enter ' + input.type + ' field name'}
              value={input.name}
              onChangeText={text => updateField(input.type, text, key)}
            />
            <TouchableOpacity style={styles.deleteButton}
            onPress={() => deleteField(key)}>
              <Text style={styles.deleteText}>Click to remove this {input.type} field</Text>
            </TouchableOpacity>

          </View>
        ))}
      </ScrollView>
    </View>
  );
}

async function createPostTemplate(dataFields, name, community){
  let values = [];
    for(let i = 0; i<dataFields.length; i++){
      let item = {name: dataFields[i].name, type: dataFields[i].type};
      values.push(item);
    }
    console.log("values");
    console.log(values);

    var sendData = { "name": name, "data_field_templates": values };
    var url = "communities/" + String(community) + "/create_post_template";
    const response = await createTemplate(url, sendData);
    console.log("aaaaa");
    // success
    if(response.data.Success){
      Alert.alert("Sucess","Template created sucessfully.");
    }
    else{
      // let message = "";
      // if(response.data.Error.hasOwnProperty("name")){
      //   message = "Template name: " + response.data.Error.name[0];
      // }
      console.log(response.data);
      Alert.alert("Failure","You need to fill every field for the template!");

    }
    return response;
}

async function createTemplate(url, sendData) {
  console.log("here");
  const res = axiosInstance.post(
    url, sendData
  );
  return res;
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    // backgroundColor: "rgb(39, 84, 125)",

  },
  templateNameContainer: {
    width: "100%",
    alignItems: "center"
  },
  templateNameInput: {
    width: "90%",
    height: 50,
    margin: 10,
    fontSize: 15,
    borderWidth: 0.7,
    padding: 10,
    backgroundColor: "white",
    borderColor: "gray"
  },
  scrollView: {
    width: "95%",
    alignSelf: "center"
  },
  addFieldContainer: {
    flexDirection: "row",
    alignSelf: "center"
  },
  nameFieldContainer: {
    margin: 3,
    alignItems: "center"
  },
  fieldTextInput: {
    width: "90%",
    textAlign: "center",
    fontSize: 20
  },
  buttonView: {
    backgroundColor: "lightblue",
    padding: 5,
    margin: 5,
    alignItems: "center"
  },
  createButton: {
    justifyContent: "center",
    alignItems: "center"
  },
  createText: {
    color: "black",
    fontSize: 20
  },
  addField:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  addFieldText:{
    color: "black",
    fontSize: 20
  },
  deleteButton: {

  },
  deleteText: {
    fontSize: 17
  }
})

export default CreatePostTemplateScreen;