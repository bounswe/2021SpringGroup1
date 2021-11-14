//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Card, Col, Container, Dropdown, DropdownButton, Form, FormGroup, FormLabel, ListGroup, ListGroupItem, Row, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";



function CreatePostPage(props) {
    const history= useHistory();

    const exampleData = {
        data: [{ "id": "15", "name": "name1", "dataType": "Text" }, { "id": "16", "name": "name2", "dataType": "Text" }
            , { "id": "17", "name": "name3", "dataType": "Image" }, { "id": "18", "name": "name4", "dataType": "Image" }]
    };

    const onChangeFile = (e) => {
        let files = e.target.files;
        console.log(files);
    }
    return (

        <>
            <div>
                <SideBar />
            </div>

            <Card style={{ width: '50rem', margin: 'auto', position: 'fluid' }}>
                <Card.Title>
                    Create Post
                </Card.Title>

                <Card.Body>
                    {exampleData.data.map((field) => (
                        <Container style={{ width: '45rem', margin: '30px auto', backgroundColor: "gainsboro" }}>
                            <div >
                                <Row>
                                    <Col>
                                        <FormLabel style={{color: "black"}} > {field["name"]} </FormLabel>
                                    </Col>
                                    {field["dataType"] === "Text" && <Col xs={8}><input type="text" name="textField"></input></Col>} 
                                    {field["dataType"] === "Image" &&<Col xs={8}><input type="file" name="file" accept="image/*" onChange={(e) => onChangeFile(e)}></input>
                                    </Col>}
                                </Row>
                            </div>
                        </Container>
                    ))}
                </Card.Body>
            </Card>
            <div>
            <Card style={{ width: '15rem', margin: 'auto',position:"absolute",right: "5px",top: "5px" }}>
            <Card.Img variant="top" src="https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" />
            <Card.Body>
            <Card.Title style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>Community Name</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
            

        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroupItem style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
        <Button variant="success">Subscribe</Button>{' '}
        </ListGroupItem>
        <ListGroupItem style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
        <Button onClick={()=>history.push('/community/'+props.match.params.id)} variant="success">Feed Page</Button>{' '}
        </ListGroupItem>
        <ListGroupItem style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>    
        <Button variant="success">Create Post</Button>{' '}
        </ListGroupItem>
        <ListGroupItem style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
        <Button onClick={()=>history.push('/community/createPostTemplate/'+props.match.params.id)} variant="success">Create Post Template</Button>{' '}
        </ListGroupItem>
        </ListGroup>
            </Card>
        </div>
        </>
    );
}

export default CreatePostPage;