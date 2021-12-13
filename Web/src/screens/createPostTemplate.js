//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Card, Col, Container, Form, FormGroup, FormLabel, ListGroup, ListGroupItem, Row, Button, FormControl,Alert } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createTemplate, getCommunityData, listCommunityPosts, subscribeCommunity } from 'store/actions/communityAction';
import SideCard from 'components/card/SideCard';
import axios from 'axios';


function CreatePostTemplate(props) {
    const history = useHistory();
    let listOfPath = props?.location?.pathname?.split('/');
    let id = listOfPath[listOfPath?.length - 1];

    const [templateName, setTemplateName] = useState("");
    const [dataFields, setDataFields] = useState([]);

    const dispatch = useDispatch();
    const { communityData } = useSelector(state => state.community)
    // console.log('communityData: ', communityData?.Community);

    const [isCreated,setIsCreated]= useState(false);
    const [isSuccessful,setIsSuccessful]= useState(false);
    const [alertMessage,setAlertMessage]= useState('');


    const handleCommunityData = () => {
        dispatch(getCommunityData(id));
    }


    useEffect(() => {
        dispatch(getCommunityData(id));
    }, [])

    const createPostTemplateCall = async (e) => {
        e.preventDefault();
        let values = [];
        for (let i = 0; i < dataFields.length; i++) {
            let item = { name: dataFields[i].name, type: dataFields[i].type };
            values.push(item);
        }
        console.log("values:", values);
        var sendData = { "name": templateName, "data_field_templates": values };
        console.log("sendData:", sendData);
        const response = await dispatch(createTemplate(sendData,id));
        setIsSuccessful(response.Success);
        setAlertMessage(response.Success? "Post template created successfully.":response.Error.name);
        setIsCreated(true); 
        console.log(response);
    }

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...dataFields];
        list[index][name] = value;
        setDataFields(list);
    };
    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...dataFields];
        list.splice(index, 1);
        setDataFields(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setDataFields([...dataFields, { type: "", name: "" }]);
    };

    const returnAlert = (variant,message) => {
        if (isCreated) {
        return(
          <Alert variant={variant}>
            <Alert.Heading>{isSuccessful? "Success!":"Error!"}</Alert.Heading>
            <p>{message}</p>
          </Alert>
    
        );
        }
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
                            Create Post Template
                        </FormLabel>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="tempTitle">
                        <FormLabel style={{ color: "black", fontSize: 20, font: "bold" }} >
                            Template Name
                        </FormLabel>
                        <FormControl onChange={(text) => setTemplateName(text.target.value)} placeholder="Enter Template Name" type="text" >
                        </FormControl>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="tempDesc">
                        <FormLabel style={{ color: "black", fontSize: 20, font: "bold" }}>
                            Template Description
                        </FormLabel>
                        <FormControl as="textarea" rows={3} placeholder="Enter Template Description" type="text">
                        </FormControl>
                    </FormGroup>

                    {dataFields.map((field, i) => {
                        return (
                            <div key={i}>
                                <Row>
                                    <Col>
                                        <Form.Control style={{ margin: "10px" }} as="select" value={field.type} name="type" aria-label="Default select example" onChange={e => handleInputChange(e, i)}>
                                            <option value="0">Select Field Type</option>
                                            <option value="text">Text</option>
                                            <option value="image">Image</option>
                                            <option value="location">Location</option>
                                            <option value="date">Date</option>
                                        </Form.Control>
                                    </Col>
                                    <Col style={{ margin: "10px" }}>
                                        <FormControl placeholder="Enter Field Name" value={field.name} type="text" name="name" onChange={e => handleInputChange(e, i)} >
                                        </FormControl>
                                    </Col>
                                    <Col style={{ margin: "10px" }}>
                                        {dataFields.length !== 1 && <Button variant="danger" onClick={() => handleRemoveClick(i)}>Remove</Button>}
                                    </Col>
                                </Row>
                            </div>
                        );
                    })}
                    <FormGroup>
                        <Button style={{ margin: "20px" }} variant="warning" onClick={() => handleAddClick()}>
                            Add Field
                        </Button>
                        <br />
                        <Button style={{ margin: "20px" }} variant="primary" type="submit" onClick={e => createPostTemplateCall(e)}>
                            Create Template
                        </Button>
                    </FormGroup>

                    {isCreated && returnAlert(isSuccessful? "success":"danger",alertMessage)} 

                </Form>
            </Container>

            <SideCard props={props} communityData={communityData} handleCommunityData={handleCommunityData}/>

        </>
    );
}

export default CreatePostTemplate;