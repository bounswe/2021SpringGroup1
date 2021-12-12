//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Card, Col, Container, Form, FormGroup, FormLabel, ListGroup, ListGroupItem, Row, Button, FormControl, FormFile,Alert } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCommunityData, listCommunityPosts, listPostTemplates, subscribeCommunity } from 'store/actions/communityAction';
import { isEmpty } from 'utils/methods';
import { createPost } from 'store/actions/communityAction';
import SideCard from 'components/card/SideCard';


function CreatePostPage(props) {
    const history = useHistory();
    
    let listOfPath = props?.location?.pathname?.split('/');
    let id = listOfPath[listOfPath?.length - 1];
    console.log('id: ', id);
    console.log('props: ', props?.location?.pathname?.split('/'));

    const { communityData, postTemplates } = useSelector(state => state.community)
    console.log('communityData: ', communityData?.Community);
    console.log('postTemplates: ', postTemplates);
    useEffect(() => {
        dispatch(getCommunityData(id));
        dispatch(listPostTemplates(id));
    }, [])

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [date, setDate] = useState(new Date());
    var dataFields = [];
    const [fieldsFinal, setfieldsFinal] = useState([]);

    const [isCreated,setIsCreated]= useState(false);
    const [isSuccessful,setIsSuccessful]= useState(false);
    const [alertMessage,setAlertMessage]= useState('');


    const handleCommunityData = () => {
        dispatch(getCommunityData(id));
    }


    const handleInputChange = (e, index) => {
        // const { name, value } = e.target;
        // const list = [...dataFields];
        // list[index][name] = value;
        // setfieldsFinal(list);
        dataFields[index][e.target.name] = e.target.value;
        console.log("dataFields:", dataFields);
    };

    const dispatch = useDispatch();
    // const {isLoginSucceed} = useSelector(state=>state.auth)
    const [index, setindex] = useState(-1);

    useEffect(() => {
        if (false) {
            dispatch({
                type: '',
            })
            // history.push('/landingPage')
        }
    }, [])

    const createPostCall = async (e) => {
        e.preventDefault();
        // if(isEmpty(community_image_url) || isEmpty(description) || isEmpty(name)) {
        //   alert('please fill all the fields');
        //   return;
        // }

        let values = [];
        for (let i = 0; i < dataFields.length; i++) {
            let item = { name: dataFields[i].name, type: dataFields[i].type, content: {prop1: dataFields[i].content}};
            values.push(item);
        }
        console.log("values:", values);
        var sendData = { "title": title, "post_template": index, "data_fields": values };
        console.log("sendData:", sendData);
        const response= await dispatch(createPost(sendData,id));
        setIsSuccessful(response.Success);
        setAlertMessage(response.Success? "Post created successfully.":response.Error.name);
        setIsCreated(true); 
        console.log(response);
    }


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
                        template["id"] == index && template["data_field_templates"].map((field,idx) => (   
                            dataFields.push({name: field["name"], type: field["type"], content: ""}) &&
                            <FormGroup className="mb-3" controlId="fields">
                                <Row>
                                    <Col sm={2}>
                                        <FormLabel style={{ color: "black" }} > {field["name"]} </FormLabel>
                                    </Col>
                                    <Col>
                                        {field["type"] === "text" &&
                                            <FormControl as="textarea" rows={2} name="content" placeholder="Enter text" type="text" onChange={e => handleInputChange(e,idx)}>
                                            </FormControl>
                                        }
                                        {field["type"] === "image" &&
                                            // <FormFile accept="image/*" name="imageFile" onChange={(e) => onChangeFile(e)}>
                                            // </FormFile>
                                            <FormControl name="content" placeholder="Enter Picture URL" type="text" onChange={e => handleInputChange(e,idx)}>
                                            </FormControl>
                                        }
                                        {field["type"] === "location" &&
                                            <FormControl name="content" placeholder="Enter Location" type="text" onChange={e => handleInputChange(e,idx)} >
                                            </FormControl>
                                        }
                                        {field["type"] === "date" &&
                                            <FormControl name="content" placeholder="Enter Date" type="date" value={date} onChange={e => handleInputChange(e,idx)}>
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
                    {isCreated && returnAlert(isSuccessful? "success":"danger",alertMessage)} 

                </Form>
            </Container>

            <SideCard props={props} communityData={communityData} handleCommunityData={handleCommunityData} />
        </>
    );
}

export default CreatePostPage;