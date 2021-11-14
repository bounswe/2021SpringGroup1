//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Card, Container, ListGroup, ListGroupItem, Button, Row, Col, FormLabel } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const CommunityPage = (props) => {
  const history = useHistory();
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
          <Card style={{ width: '50rem', margin: 'auto', marginBottom: "30px" }}>
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

        <div>
          <Card style={{ width: '15rem', margin: 'auto', position: "absolute", right: "5px", top: "5px" }}>
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
                <Button onClick variant="success">Subscribe</Button>{' '}
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
        </div>
      </div>
    </>
  );
}

export default CommunityPage;