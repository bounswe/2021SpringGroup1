//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Button, Card, ListGroup, ListGroupItem, Col, Row, Container, FormLabel } from 'react-bootstrap';


const MyPosts = (props) => {

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
    // <Container style={{ width: '45rem', margin: '30px auto', backgroundColor: "gainsboro" }}>
    //                         <div >
    //                             <Row>
    //                                 <Col>
    //                                     <FormLabel style={{color: "black"}} > {posts["name"]} </FormLabel>
    //                                 </Col>
    //                                 {posts["dataType"] === "Text" && <Col xs={8}><input type="text" name="textField"></input></Col>} 
    //                                 {posts["dataType"] === "Image" &&<Col xs={8}><input type="file" name="file" accept="image/*" onChange={(e) => onChangeFile(e)}></input>
    //                                 </Col>}
    //                             </Row>
    //                         </div>
    //                     </Container>
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

                {/* <Card style={{ width: '50rem', margin: 'auto' }}>
                    <Card.Title>Card Title</Card.Title>


                    <div class="latest-photos">
                        <div class="row"><div class="col-md-4">
                            <figure> <img class="img-fluid" src="https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" alt="" />
                            </figure></div><div class="col-md-4"> <figure> <img class="img-fluid" src="https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" alt="" />
                            </figure></div><div class="col-md-4"> <figure> <img class="img-fluid" src="https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" alt="" />
                            </figure></div><div class="col-md-4"> <figure> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="" />
                            </figure></div><div class="col-md-4"> <figure> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="" />
                            </figure></div><div class="col-md-4"> <figure> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" />
                            </figure></div><div class="col-md-4"> <figure class="mb-0"> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                            </figure></div><div class="col-md-4"> <figure class="mb-0"> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="" />
                            </figure></div><div class="col-md-4"> <figure class="mb-0"> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar9.png" alt="" />
                            </figure></div></div></div>
                    <Card.Body>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Cras justo odio</ListGroupItem>
                        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                        <ListGroupItem>Vestibulum at eros</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
                <Card style={{ width: '50rem', margin: '30px auto' }}>
                    <Card.Img variant="top" src="https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Cras justo odio</ListGroupItem>
                        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                        <ListGroupItem>Vestibulum at eros</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card> */}
            </div>
        </>
    );
}

export default MyPosts;