//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Card, Col, Container, Form, FormGroup, FormLabel, ListGroup, ListGroupItem, Row, Button, FormControl, FormFile } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCommunityData, listCommunityPosts, listPostTemplates, subscribeCommunity } from 'store/actions/communityAction';
import { isEmpty } from 'utils/methods';
import { createPost } from 'store/actions/communityAction';
import SideCard from 'components/card/SideCard';


function CreatePostPage(props) {
    const history = useHistory();
    //TODO complete this.
    const [title, setTitle] = useState('');
    const [post_template, setPost_template] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();
    // const {isLoginSucceed} = useSelector(state=>state.auth)

    useEffect(() => {
        if (false) {
            dispatch({
                type: '',
            })
            // history.push('/landingPage')
        }
    }, [])

    const createPostCall = (e) => {
        e.preventDefault();
        // if(isEmpty(community_image_url) || isEmpty(description) || isEmpty(name)) {
        //   alert('please fill all the fields');
        //   return;
        // }
        dispatch(createPost({}))
    }

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


    const subscribeCall = (e, id, isJoined) => {
        e.preventDefault();
        // dispatch(subscribeCommunity(id));
        dispatch(subscribeCommunity(id, isJoined));
    }

    const exampleData = {
        data: [{
            "id": 0,
            "community": 0,
            "name": "birinci",
            "data_field_templates": [
                {
                    "name": "body",
                    "type": "text"
                }
            ]
        },
        {
            "id": 1,
            "community": 0,
            "name": "ikinci template",
            "data_field_templates": [
                {
                    "name": "foto",
                    "type": "image"
                },
                {
                    "name": "tarih",
                    "type": "date"
                },
                {
                    "name": "yer2",
                    "type": "location"
                },
                {
                    "name": "yazı",
                    "type": "text"
                },
                {
                    "name": "yer1",
                    "type": "location"
                },

            ]
        },
        {
            "id": 2,
            "community": 0,
            "name": "üçüncü",
            "data_field_templates": [
                {
                    "name": "yer",
                    "type": "location"
                }
            ]
        },
        {
            "id": 3,
            "community": 0,
            "name": "dördüncü",
            "data_field_templates": [
                {
                    "name": "tarih",
                    "type": "date"
                }
            ]
        }]
    };

    const [index, setindex] = useState("init");
    const displayTemplate = (e) => {

    }

    const onChangeFile = (e) => {
        let files = e.target.files;
        console.log(files);
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
                    {index !== "init" && postTemplates["Post_templates"]?.map((field) => (
                        field["id"] === index &&
                        <FormGroup className="mb-3" controlId="fields">
                            <Row>
                                <Col sm={2}>
                                    <FormLabel style={{ color: "black" }} > {field["name"]} </FormLabel>
                                </Col>
                                <Col>
                                    {field["type"] === "text" &&
                                        <FormControl as="textarea" rows={2} name="textField" placeholder="Enter text" type="text">
                                        </FormControl>
                                    }
                                    {field["type"] === "image" &&
                                        // <FormFile accept="image/*" name="imageFile" onChange={(e) => onChangeFile(e)}>
                                        // </FormFile>
                                        <FormControl placeholder="Enter Picture URL" type="text" onChange={(e) => onChangeFile(e)}>
                                        </FormControl>
                                    }
                                    {field["type"] === "location" &&
                                        <FormControl name="locField" placeholder="Enter Location" type="text">
                                        </FormControl>
                                    }
                                    {field["type"] === "date" &&
                                        <FormControl name="dateField" placeholder="Enter Date" type="date" value={date} onChange={(e) => setDate(e.target.value)}>
                                        </FormControl>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>
                    ))}

                    <FormGroup>
                        <Button style={{ marginBottom: "20px" }} onClick={() => { createPostCall() }} variant="success">Create Post</Button>{' '}
                    </FormGroup>
                </Form>
            </Container>

            <SideCard props={props} communityData={communityData} />

            {/* <div>
                <Card style={{ width: '15rem', margin: 'auto', position: "absolute", right: "5px", top: "5px" }}>
                    <Card.Img variant="top" src={communityData?.Community?.community_image_url} />
                    <Card.Body>
                        <Card.Title style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>{communityData?.Community?.name}</Card.Title>
                        <Card.Text>
                            {communityData?.Community?.description}
                        </Card.Text>


                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Button onClick={e => subscribeCall(e, communityData?.Community?.id, communityData?.Community?.isJoined)}
                                variant={communityData?.Community?.isJoined ? 'danger' : 'success'}>
                                {communityData?.Community?.isJoined ? 'Unsubscribe' : 'Subscribe'}
                            </Button>{' '}
                        </ListGroupItem>
                        <ListGroupItem style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Button variant="success">Feed Page</Button>{' '}
                        </ListGroupItem>
                        <ListGroupItem style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Button onClick={() => history.push('/community/createPostPage/' + props.match.params.id)} variant="success">Create Post</Button>{' '}
                        </ListGroupItem>
                        <ListGroupItem style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Button onClick={() => history.push('/community/createPostTemplate/' + props.match.params.id)} variant="success">Create Post Template</Button>{' '}
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </div> */}
        </>
    );
}

export default CreatePostPage;