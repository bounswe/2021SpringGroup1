//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Card, Col, Container, Dropdown, DropdownButton, Form, FormGroup, FormLabel, ListGroup, ListGroupItem, Row, Button } from 'react-bootstrap';




function CreatePostTemplate(props) {

    const [typeState, setTypeState] = useState("")

    return (

        <>
            <div>
                <SideBar />
            </div>

            <Card style={{ width: '50rem', margin: 'auto', position: 'fluid' }}>
                <Card.Title>
                    Create Post Template
                </Card.Title>
                <Card.Subtitle>
                    You can add max 6 fields.
                </Card.Subtitle>

                <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <DropdownButton id="dropdown-basic-button" title="Select Field">
                                    <Dropdown.Item href="#/action-1">Text</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Image</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Location</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                            <Col>
                                <input type="text" placeholder="Enter Field Name">
                                </input>
                            </Col>
                            <Col>
                                <Button variant="primary" type="submit">
                                    Add
                                </Button>
                            </Col>
                        </Row>
                        <Row style={{margin: "5px"}}>

                            <Button variant="primary" type="submit">
                                Send
                            </Button>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </>
    );
}

export default CreatePostTemplate;