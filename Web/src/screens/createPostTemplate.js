//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Card, Col, Container, Dropdown, DropdownButton, Form, FormGroup, FormLabel, ListGroup, ListGroupItem, Row, Button } from 'react-bootstrap';



function CreatePostTemplate(props) {

    const [typeState, setTypeState] = useState(1)
    const [value, setValue] = useState([]);
    const handleSelect = (e) => {
        console.log(e);
        setValue(e)
    }
    const handleChange = (ev) => {
        console.log(ev);
        // setValue(...value.push(ev))
    }
    let content = [];
    for (let i = 0; i < typeState; i++) {
        content.push(<Row>
            <Col>
                <DropdownButton style={{ margin: "10px" }} id="dropdown-basic-button" title="Select Field" onSelect={handleSelect}>
                    <Dropdown.Item eventKey="Text">Text</Dropdown.Item>
                    <Dropdown.Item eventKey="Image">Image</Dropdown.Item>
                </DropdownButton>
            </Col>
            <Col style={{ margin: "15px" }}>
                <input type="text" placeholder="Enter Field Name" name="fieldName" onChange={handleChange}>
                </input>
            </Col>
        </Row>);
    }

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
                                <FormLabel style={{ color: "black" }}>
                                    Template Title
                                </FormLabel>
                            </Col>
                            <Col>
                                <input type="text" name='title' placeholder="Enter Template Title">
                                </input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormLabel style={{ color: "black" }}>
                                    Template Description
                                </FormLabel>
                            </Col>
                            <Col>
                                <input type="text" name='description' placeholder="Enter Template Description">
                                </input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button style={{ margin: "20px" }} variant="primary" type="submit" onClick={typeState < 6 ? () => setTypeState(typeState + 1) : undefined}>
                                    Add
                                </Button>
                            </Col>
                        </Row>
                        {content}
                        <Row style={{ margin: "5px" }}>

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