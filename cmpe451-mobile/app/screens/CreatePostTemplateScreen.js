import React, { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet,TextInput,ScrollView} from "react-native";
import { axiosInstance } from "../service/axios_client_service";

function CreatePostTemplateScreen({ route, navigation }) {
  const { community } = route.params;
  //console.log(community);

  const [name, setName] = React.useState('');
  const [textInputs, setTextInputs] = useState([{ key: '', value: '' }]);
  const [dateInputs, setDateInputs] = useState([{ key: '', value: '' }]);
  const [locationInputs, setLocationInputs] = useState([{ key: '', value: '' }]);
  const [imageInputs, setImageInputs] = useState([{ key: '', value: '' }]);

  const textFieldKey = 'text';
  const dateFieldKey = 'date';
  const locationFieldKey = 'location';
  const imageFieldKey = 'image';

  const addFieldHandler = fieldType => {
    if (fieldType === "text") {
      const _textInputs = [...textInputs];
      _textInputs.push({ key: '', value: '' });
      setTextInputs(_textInputs);
    }
    if (fieldType === "date") {
      const _dateInputs = [...dateInputs];
      _dateInputs.push({ key: '', value: '' });
      setDateInputs(_dateInputs);
    }
    if (fieldType === "location") {
      const _locationInputs = [...locationInputs];
      _locationInputs.push({ key: '', value: '' });
      setLocationInputs(_locationInputs);
    }
    if (fieldType === "image") {
      const _imageInputs = [...imageInputs];
      _imageInputs.push({ key: '', value: '' });
      setImageInputs(_imageInputs);
    }
  };

  const deleteFieldHandler = (fieldType, key) => {
    if (fieldType === "text") {
      const _textInputs = textInputs.filter((input, index) => index !== key);
      setTextInputs(_textInputs);
    }
    if (fieldType === "date") {
      const _dateInputs = dateInputs.filter((input, index) => index !== key);
      setDateInputs(_dateInputs);
    }
    if (fieldType === "location") {
      const _locationInputs = locationInputs.filter((input, index) => index !== key);
      setLocationInputs(_locationInputs);
    }
    if (fieldType === "image") {
      const _imageInputs = imageInputs.filter((input, index) => index !== key);
      setImageInputs(_imageInputs);
    }
  };

  const inputHandler = (fieldType, text, key) => {
    if (fieldType === "text") {
      const _textInputs = [...textInputs];
      _textInputs[key].value = text;
      _textInputs[key].key = key;
      setTextInputs(_textInputs);
    }
    if (fieldType === "date") {
      const _dateInputs = [...dateInputs];
      _dateInputs[key].value = text;
      _dateInputs[key].key = key;
      setDateInputs(_dateInputs);
    }
    if (fieldType === "location") {
      const _locationInputs = [...locationInputs];
      _locationInputs[key].value = text;
      _locationInputs[key].key = key;
      setLocationInputs(_locationInputs);
    }
    if (fieldType === "image") {
      const _imageInputs = [...imageInputs];
      _imageInputs[key].value = text;
      _imageInputs[key].key = key;
      setImageInputs(_imageInputs);
    }
  };


  const formatData = () => {
    const textFieldNames = textInputs
      .filter(input => input.value)
      .map(input => input.value);
    const dateFieldNames = dateInputs
      .filter(input => input.value)
      .map(input => input.value);
    const locationFieldNames = locationInputs
      .filter(input => input.value)
      .map(input => input.value);
    const imageFieldNames = imageInputs
      .filter(input => input.value)
      .map(input => input.value);

    return {
      name: name,
      textFieldNames: textFieldNames,
      dateFieldNames: dateFieldNames,
      locationFieldNames: locationFieldNames,
      imageFieldNames: imageFieldNames
    };
  };
  // api call
  const createPostTypeHandler = async () => {
    var data = formatData();
    var data_fields = [];
    var text_names = data.textFieldNames;
    var date_names = data.dateFieldNames;
    var location_names = data.locationFieldNames;
    var image_names = data.imageFieldNames;

    for (let i = 0; i < text_names.length; i++) {
      let x = text_names[i];
      data_fields.push({ "name": x, "type": "text" })
    }
    for (let i = 0; i < date_names.length; i++) {
      let x = date_names[i];
      data_fields.push({ "name": x, "type": "date" })
    }
    for (let i = 0; i < location_names.length; i++) {
      let x = location_names[i];
      data_fields.push({ "name": x, "type": "location" })
    }
    for (let i = 0; i < image_names.length; i++) {
      let x = image_names[i];
      data_fields.push({ "name": x, "type": "image" })
    }

    var sendData = { "name": data.name, "data_field_templates": data_fields };
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
            returnKeyType="done"
          />
        </View>
        <Button
          title="Create Post Template"
          onPress={createPostTypeHandler} />

        <View style={styles.addFieldContainer}>
          <View style={styles.buttonView}>
            <Button
              title="Text Field"
              onPress={() => addFieldHandler(textFieldKey)}
            />
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Date Field"
              onPress={() => addFieldHandler(dateFieldKey)}
            />
          </View>
        </View>
        <View style={styles.addFieldContainer}>
          <View style={styles.buttonView}>
              <Button
                title="Location Field"
                onPress={() => addFieldHandler(locationFieldKey)}
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Image Field"
                onPress={() => addFieldHandler(imageFieldKey)}
              />
            </View>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
        {textInputs.map((input, key) => (
          <View style={styles.nameFieldContainer}
          >
            <TextInput
              style={styles.fieldTextInput}
              placeholder={'Enter text field name'}
              value={input.value}
              onChangeText={text => inputHandler(textFieldKey, text, key)}
            />
            <Button
              title="Delete"
              onPress={() => deleteFieldHandler(textFieldKey, key)}
            />
          </View>
        ))}
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
        {dateInputs.map((input, key) => (
          <View style={styles.nameFieldContainer}
          >
            <TextInput
              style={styles.fieldTextInput}
              placeholder={'Enter date field name'}
              value={input.value}
              onChangeText={text => inputHandler(dateFieldKey, text, key)}
            />
            <Button
              title="Delete"
              onPress={() => deleteFieldHandler(dateFieldKey, key)}
            />
          </View>
        ))}
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
        {locationInputs.map((input, key) => (
          <View style={styles.nameFieldContainer}
          >
            <TextInput
              style={styles.fieldTextInput}
              placeholder={'Enter location field name'}
              value={input.value}
              onChangeText={text => inputHandler(locationFieldKey, text, key)}
            />
            <Button
              title="Delete"
              onPress={() => deleteFieldHandler(locationFieldKey, key)}
            />
          </View>
        ))}
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
        {imageInputs.map((input, key) => (
          <View style={styles.nameFieldContainer}
          >
            <TextInput
              style={styles.fieldTextInput}
              placeholder={'Enter image field name'}
              value={input.value}
              onChangeText={text => inputHandler(imageFieldKey, text, key)}
            />
            <Button
              title="Delete"
              onPress={() => deleteFieldHandler(imageFieldKey, key)}
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
    width: "90%",
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