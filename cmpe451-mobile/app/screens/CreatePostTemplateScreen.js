import React, { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet,TextInput,ScrollView} from "react-native";
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

  // api call
  const createPostTemplate = async () => {

    let values = [];
    for(let i = 0; i<dataFields.length; i++){
      let item = {name: dataFields[i].name, type: dataFields[i].type};
      values.push(item);
    }

    console.log(values);

    var sendData = { "name": name, "data_field_templates": values };
    var url = "communities/" + String(community) + "/create_post_template";
    const res = axiosInstance.post(
      url, sendData
    );
    console.log((await res).data);
    return (await res).data;
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
        </View>
        <Button
          title="Create Post Template"
          onPress={createPostTemplate} />

        <View style={styles.addFieldContainer}>
          <View style={styles.buttonView}>
            <Button
              title="Add Text Field"
              onPress={() => addField(textFieldKey)}
            />
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Add Date Field"
              onPress={() => addField(dateFieldKey)}
            />
          </View>
        </View>
        <View style={styles.addFieldContainer}>
          <View style={styles.buttonView}>
              <Button
                title="Add Location Field"
                onPress={() => addField(locationFieldKey)}
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Add Image Field"
                onPress={() => addField(imageFieldKey)}
              />
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
            <Button
              title="Delete"
              onPress={() => deleteField(key)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white"
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
    backgroundColor: "white",
    padding: 5,
    margin: 5,
    borderWidth: 1
  }
})

export default CreatePostTemplateScreen;