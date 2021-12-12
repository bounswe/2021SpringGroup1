//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Card, Col, Container, Form, FormGroup, FormLabel, ListGroup, ListGroupItem, Row, Button, FormControl } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createTemplate, getCommunityData, listCommunityPosts, subscribeCommunity } from 'store/actions/communityAction';
import SideCard from 'components/card/SideCard';


function CreatePostTemplate(props) {
    const history = useHistory();
    let listOfPath = props?.location?.pathname?.split('/');
    let id = listOfPath[listOfPath?.length - 1];
    // console.log('id: ', id);
    // console.log('props: ', props?.location?.pathname?.split('/'));
    const [templateName, setTemplateName] = useState("");
    const [fields, setFields] = useState([]);
    const dispatch = useDispatch();
    const { communityData, communityPosts } = useSelector(state => state.community)
    // console.log('communityData: ', communityData?.Community);
    // console.log('communityPosts: ', communityPosts);
    useEffect(() => {
        dispatch(getCommunityData(id));
        // dispatch(listCommunityPosts(id));
    }, [])

    function transformInToFormObject(data) {
        let formData = new FormData();
        console.log(fields);
        for (let key in data) {
          if (Array.isArray(data[key])) {
            data[key].forEach((obj, index) => {
              let keyList = Object.keys(obj);
              keyList.forEach((keyItem) => {
                if(keyItem==0) {
                console.log(keyItem);
                let keyName = [key, "[", index, "]", ".", "type"].join("");
                console.log(keyName);
                console.log(obj[keyItem]);
                formData.append(keyName, String(obj[keyItem]));
                } else {
                    console.log(keyItem);
                let keyName = [key, "[", index, "]", ".", "name"].join("");
                console.log(keyName);
                console.log(obj[keyItem]);
                formData.append(keyName, String(obj[keyItem]));

                }
              });
            });
          } else if (typeof data[key] === "object") { 
            for (let innerKey in data[key]) {
              formData.append(`${key}.${innerKey}`, data[key][innerKey]);
            }
          } else {
            formData.append(key, data[key]);
          }
        }
        return formData;
      }
    const createPostTemplateCall = (e) => {
        // let formData = new FormData();
        // formData.append("name",templateName);
        // fields.forEach((item,index) => {formData.append('data_field_templates['+ index +'].type', item.type);
        // formData.append('data_field_templates[' +index+'].name', item.name)});
        // fields.forEach((item,index) =>
        // formData.append("data_field_templates", {
        //    "name": String(item.name),
        //    "type": String(item.type)
        // }));
        // console.log(formData.getAll('data_field_templates'))
        // fields.forEach(item => {
        //     formData.append(`data_field_templates`,item);
        //   });
        // for(let i = 0; i < fields.length; i += 1) {
        //     Object.keys(fields[i]).forEach((key) => {
        //         if(key === 'image') {
        //             formData.append(key, JSON.stringify(fields[i][key]))
        //          } else {
        //              formData.append(key, fields[i][key])
        //          }
        //     })
        // }
        // formData.append("name",templateName);
         e.preventDefault();
        // dispatch(subscribeCommunity(id));
        
        // 
    }

    const subscribeCall = (e, id, isJoined) => {
        e.preventDefault();
        // dispatch(subscribeCommunity(id));
        dispatch(subscribeCommunity(id, isJoined));
    }

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...fields];
        list[index][name] = value;
        setFields(list);
    };
    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...fields];
        list.splice(index, 1);
        setFields(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setFields([...fields, { type: "", name: "" }]);
    };
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

                    {fields.map((field, i) => {
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
                                        {fields.length !== 1 && <Button variant="danger" onClick={() => handleRemoveClick(i)}>Remove</Button>}
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
                </Form>
            </Container>

            <SideCard props={props} communityData={communityData}/>

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

export default CreatePostTemplate;