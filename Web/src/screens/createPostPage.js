//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Card, Col, Container, Dropdown, DropdownButton, Form, FormGroup, FormLabel, ListGroup, ListGroupItem, Row, Button } from 'react-bootstrap';



function CreatePostPage(props) {

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
        </>
    );
}

export default CreatePostPage;