//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Col, Container, Form, FormGroup, FormLabel, Row, Button, FormControl, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPosts,editPost, getPostData } from 'store/actions/communityAction';
import MaterialUICard from 'components/card/MaterialUICard'
import PostCard from 'components/card/MaterialUICard';
import myDate from 'utils/methods';
import {useHistory } from "react-router-dom";
import MapGoogle from 'components/googleMaps';



const EditPostPage = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { postData } = useSelector(state => state.community)

    let listOfPath = props?.location?.pathname?.split('/');
    let id = listOfPath[listOfPath?.length - 1];

    const [title, setTitle] = useState(postData.title);
    const [dataFields,setDataFields]= useState([]);
    const [location, setLocation] = useState({});
    const [address, setAddress] = useState("");
    useEffect(() => {
        dispatch(getPostData(id));        
        
    }, [])

    for (let i = 0; i < dataFields.length; i++) {
        let tempArray2 = [...dataFields];
        tempArray2[i].name = postData.data_fields[i].name;
        tempArray2[i].type = postData.data_fields[i].type;
        tempArray2[i].content = postData.data_fields[i].type=="location"? postData.data_fields[i].content.prop1:"";

        setDataFields(tempArray2);
      }
    const [isCreated, setIsCreated] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    const handleInputChange = (e, index) => {
        let tempArray = [...dataFields];

        tempArray[index][e.target.name] = e.target.value;
        setDataFields(tempArray);
    };

    
    
    const editPostCall = async (e) => {
        e.preventDefault();
        // if(isEmpty(community_image_url) || isEmpty(description) || isEmpty(name)) {
        //   alert('please fill all the fields');
        //   return;
        // }

        let values = [];
        for (let i = 0; i < dataFields.length; i++) {
            let item = {};
            if (dataFields[i].type == "location"&& location!={}) {
                item = { name: dataFields[i].name, type: dataFields[i].type, content: { marker: location, adrs: address } };
            }
            else if (dataFields[i].type == "location"&& location=={}) {
                item = { name: dataFields[i].name, type: dataFields[i].type, content: { marker: postData.data_fields[i].content.marker, adrs: postData.data_fields[i].content.adrs } };
            }
            else {
                item = { name: dataFields[i].name, type: dataFields[i].type, content: { prop1: dataFields[i].content } };
            }

            values.push(item);
        }
        console.log("values:", values);
        var sendData = { "title": title, "post_template": postData.post_template, "data_fields": values };
        console.log("sendData:", sendData);
        const response = await dispatch(editPost(sendData, id));
        setIsSuccessful(response.Success);
        setAlertMessage(response.Success ? "Post edited successfully." : response.Error.name);
        setIsCreated(true);
        console.log("response: ", response);
    }


    const restoreFieldsCall = async (e) => {
        e.preventDefault();
        // if(isEmpty(community_image_url) || isEmpty(description) || isEmpty(name)) {
        //   alert('please fill all the fields');
        //   return;
        // }

        setTitle(postData.title);
        setLocation({});
        setAddress("");
        for (let i = 0; i < dataFields.length; i++) {
            let tempArray2 = [...dataFields];
            tempArray2[i].name = postData.data_fields[i].name;
            tempArray2[i].type = postData.data_fields[i].type;
            tempArray2[i].content = postData.data_fields[i].type=="location"? postData.data_fields[i].content.prop1:"";

            setDataFields(tempArray2);
          }
    }

    const returnAlert = (variant, message) => {
        if (isCreated) {
            return (
                <Alert variant={variant}>
                    <Alert.Heading>{isSuccessful ? "Success!" : "Error!"}</Alert.Heading>
                    <p>{message}</p>
                </Alert>
            );
        }
    }

    function getLocationData(loc, add) {
        console.log("location: ", location);
        console.log("address: ", address);
        setLocation(loc);
        setAddress(add);
    }

    return (
        <>
            <div>
                <SideBar />
            </div>

            <Container fluid={true} style={{ width: '55rem', margin: '0px auto', backgroundColor: "Lavender" }}>
                <Form>
                    <FormGroup className="mb-3">
                        <FormLabel style={{ color: "black", fontSize: 30, font: "bold" }}>
                            Create Post
                        </FormLabel>
                    </FormGroup>
                    
                    <FormGroup className="mb-3">
                        <FormLabel style={{ color: "black", fontSize: 15, font: "bold" }}>
                            Post Title
                        </FormLabel>
                        <Form.Control name="postTitle" value= {title} placeholder="Please Enter Post Title" onChange={(text) => setTitle(text.target.value)}>
                        </Form.Control>
                    </FormGroup>

                    {postData["data_fields"].map((field, idx) => (
                            <FormGroup className="mb-3" controlId="fields">
                                <Row>
                                    <Col sm={2}>
                                        <FormLabel style={{ color: "black" }} > {field["name"]} </FormLabel>
                                    </Col>
                                    <Col>
                                        {field["type"] === "text" &&
                                            <FormControl as="textarea" rows={2} value={dataFields[idx].content} name="content" placeholder="Enter text" type="text" onChange={e => handleInputChange(e, idx)}>
                                            </FormControl>
                                        }
                                        {field["type"] === "image" &&
                                            // <FormFile accept="image/*" name="imageFile" onChange={(e) => onChangeFile(e)}>
                                            // </FormFile>
                                            <FormControl name="content" value={dataFields[idx].content} placeholder="Enter Picture URL" type="text" onChange={e => handleInputChange(e, idx)}>
                                            </FormControl>
                                        }
                                        {field["type"] === "location" &&
                                            <MapGoogle getLocationData={getLocationData} />
                                        }
                                        {field["type"] === "date" &&
                                            <FormControl name="content" value={dataFields[idx].content} placeholder="Enter Date" type="date" onChange={e => handleInputChange(e, idx)}>
                                            </FormControl>
                                        }
                                    </Col>
                                </Row>
                            </FormGroup>
                        ))}


                    <FormGroup>
                        <Button style={{ marginBottom: "20px" }} onClick={(e) => { editPostCall(e) }} variant="success">Edit Post</Button>{' '}
                        <Button style={{ marginBottom: "20px" }} onClick={(e) => { restoreFieldsCall(e) }} variant="warning">Restore Changes</Button>{' '}

                    </FormGroup>
                    {isCreated && returnAlert(isSuccessful ? "success" : "danger", alertMessage)}

                </Form>
            </Container>
        </>
    );
}

export default EditPostPage;