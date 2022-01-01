//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Col, Container, Form, FormGroup, FormLabel, Row, Button, FormControl, Alert } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCommunityData, listPostTemplates } from 'store/actions/communityAction';
import { isEmpty } from 'utils/methods';
import { createPost } from 'store/actions/communityAction';
import SideCard from 'components/card/SideCard';
import MapGoogle from 'components/googleMaps';


function CreatePostPage(props) {
    const history = useHistory();

    let listOfPath = props?.location?.pathname?.split('/');
    let id = listOfPath[listOfPath?.length - 1];

    const { communityData, postTemplates } = useSelector(state => state.community)
    console.log('communityData: ', communityData?.Community);
    console.log('postTemplates: ', postTemplates);
    useEffect(() => {
        dispatch(getCommunityData(id));
        dispatch(listPostTemplates(id));
    }, [])

    const [title, setTitle] = useState('');
    var dataFields = [];

    const [isCreated, setIsCreated] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleCommunityData = () => {
        dispatch(getCommunityData(id));
    }

    const handleInputChange = (e, index) => {
        dataFields[index][e.target.name] = e.target.value;
        console.log("dataFields:", dataFields);
    };

    const dispatch = useDispatch();
    const [index, setindex] = useState(-1);

    useEffect(() => {
        if (false) {
            dispatch({
                type: '',
            })
            // history.push('/landingPage')
        }
    }, [])
    const [location, setLocation] = useState({});
    const [address, setAddress] = useState("");
    const createPostCall = async (e) => {
        e.preventDefault();
        // if(isEmpty(community_image_url) || isEmpty(description) || isEmpty(name)) {
        //   alert('please fill all the fields');
        //   return;
        // }

        let values = [];
        for (let i = 0; i < dataFields.length; i++) {
            let item = {};
            if (dataFields[i].type == "location") {
                item = { name: dataFields[i].name, type: dataFields[i].type, content: { marker: location, adrs: address } };
            }
            else {
                item = { name: dataFields[i].name, type: dataFields[i].type, content: { prop1: dataFields[i].content } };
            }

            values.push(item);
        }
        console.log("values:", values);
        var sendData = { "title": title, "post_template": index, "data_fields": values };
        console.log("sendData:", sendData);
        const response = await dispatch(createPost(sendData, id));
        setIsSuccessful(response.Success);
        setAlertMessage(response.Success ? "Post created successfully." : response.Error.name);
        setIsCreated(true);
        console.log("response: ", response);
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
                    <FormGroup className="mb-3" controlId="templateNum">
                        <Form.Control as="select" aria-label="Default select example" onChange={(e) => setindex(e.target.value)}>
                            <option value="init">Please Select a Template</option>
                            {postTemplates["Post_templates"]?.map((field) => (
                                <option value={field.id}>{field.name}</option>
                            ))}
                        </Form.Control>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormLabel style={{ color: "black", fontSize: 15, font: "bold" }}>
                            Post Title
                        </FormLabel>
                        <Form.Control name="postTitle" placeholder="Please Enter Post Title" onChange={(text) => setTitle(text.target.value)}>
                        </Form.Control>
                    </FormGroup>

                    {index > -1 && postTemplates["Post_templates"]?.map((template) => (
                        template["id"] == index && template["data_field_templates"].map((field, idx) => (
                            dataFields.push({ name: field["name"], type: field["type"], content: "" }) &&
                            <FormGroup className="mb-3" controlId="fields">
                                <Row>
                                    <Col sm={2}>
                                        <FormLabel style={{ color: "black" }} > {field["name"]} </FormLabel>
                                    </Col>
                                    <Col>
                                        {field["type"] === "text" &&
                                            <FormControl as="textarea" rows={2} name="content" placeholder="Enter text" type="text" onChange={e => handleInputChange(e, idx)}>
                                            </FormControl>
                                        }
                                        {field["type"] === "image" &&
                                            // <FormFile accept="image/*" name="imageFile" onChange={(e) => onChangeFile(e)}>
                                            // </FormFile>
                                            <FormControl name="content" placeholder="Enter Picture URL" type="text" onChange={e => handleInputChange(e, idx)}>
                                            </FormControl>
                                        }
                                        {field["type"] === "location" &&
                                            <MapGoogle getLocationData={getLocationData} />
                                        }
                                        {field["type"] === "date" &&
                                            <FormControl name="content" placeholder="Enter Date" type="date" onChange={e => handleInputChange(e, idx)}>
                                            </FormControl>
                                        }
                                    </Col>
                                </Row>
                            </FormGroup>
                        ))
                    ))}


                    <FormGroup>
                        <Button style={{ marginBottom: "20px" }} onClick={(e) => { createPostCall(e) }} variant="success">Create Post</Button>{' '}
                    </FormGroup>
                    {isCreated && returnAlert(isSuccessful ? "success" : "danger", alertMessage)}

                </Form>
            </Container>

            <SideCard props={props} communityData={communityData} handleCommunityData={handleCommunityData} />
        </>
    );
}

export default CreatePostPage;