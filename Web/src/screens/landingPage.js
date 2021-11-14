//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Button, Card, ListGroup, ListGroupItem,Row,Col,Container,FormLabel } from 'react-bootstrap';


const landingPage = (props) => {

    const exampleData = {
        data: [{
            "title": "Travel", "description": "name1", "data_fields": [{ "id": "17", "name": "name3", "dataType": "Image", "data": "https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" }, { "id": "16", "name": "name2", "dataType": "Text", "data": "Deneme test" }],
            "posted_by": "Muhammed", "post_date": "10/11/2021", "community": "Boun"
        },
        {
            "title": "Tournement", "description": "name1", "data_fields": [{ "id": "17", "name": "name3", "dataType": "Image", "data": "https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" }, { "id": "16", "name": "name2", "dataType": "Text", "data": "Deneme test" }],
            "posted_by": "Emir", "post_date": "11/11/2021", "community": "Cmpe"
        },
        {
            "title": "Tournement", "description": "name1", "data_fields": [{ "id": "17", "name": "name3", "dataType": "Image", "data": "https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" }, { "id": "16", "name": "name2", "dataType": "Text", "data": "Deneme test" }],
            "posted_by": "Emir", "post_date": "11/11/2021", "community": "Cmpe"
        },
        {
            "title": "Tournement", "description": "name1", "data_fields": [{ "id": "17", "name": "name3", "dataType": "Image", "data": "https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" }, { "id": "16", "name": "name2", "dataType": "Text", "data": "Deneme test" }],
            "posted_by": "Emir", "post_date": "11/11/2021", "community": "Cmpe"
        },
        {
            "title": "Tournement", "description": "name1", "data_fields": [{ "id": "17", "name": "name3", "dataType": "Image", "data": "https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" }, { "id": "16", "name": "name2", "dataType": "Text", "data": "Deneme test" }],
            "posted_by": "Emir", "post_date": "11/11/2021", "community": "Cmpe"
        }]
    };
    return (
        <>
            <div>
                <SideBar />
            </div>
            <div>
                {exampleData.data.map((posts) => (
                    <Card style={{ width: '50rem', margin: 'auto' }}>
                        <Row>
                            <Col>
                                <Card.Title>{posts["title"]}</Card.Title>
                            </Col>
                            <Col>
                                <Card.Title>{posts["community"]}</Card.Title>
                            </Col>
                            <Col>
                                <Card.Title>Posted by @{posts["posted_by"]}</Card.Title>
                            </Col>
                        </Row>
                        {posts["data_fields"].map((field) => (
                            <Container style={{ width: '45rem', margin: '30px auto', backgroundColor: "gainsboro" }}>
                                <div >
                                    <Row>
                                        <Col>
                                            <FormLabel style={{ color: "black" }} > {field["name"]} </FormLabel>
                                        </Col>
                                        {field["dataType"] === "Text" && <Col xs={8}><Card.Text type="text" name="textField">{field["data"]}</Card.Text></Col>}
                                        {field["dataType"] === "Image" && <Col xs={8}><Card.Img src={field["data"]}></Card.Img>
                                        </Col>}
                                    </Row>
                                </div>
                            </Container>
                        ))}
                    </Card>
                ))}
            </div>
        </>
    );
}

export default landingPage;