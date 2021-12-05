//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Card, Container, ListGroup, ListGroupItem, Button, Row, Col, FormLabel } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCommunityData, listCommunityPosts, subscribeCommunity } from 'store/actions/communityAction';

const CommunityPage = (props) => {
  const history = useHistory();
  let listOfPath = props?.location?.pathname?.split('/');
  let id = listOfPath[listOfPath?.length - 1];
  console.log('id: ', id);
  console.log('props: ', props?.location?.pathname?.split('/'));

  const dispatch = useDispatch();
  const { communityData, communityPosts } = useSelector(state => state.community)
  console.log('communityData: ', communityData?.Community);
  console.log('communityPosts: ', communityPosts);
  useEffect(() => {
    dispatch(getCommunityData(id));
    dispatch(listCommunityPosts(id));
  }, [])


  const subscribeCall = (e, id, isJoined) => {
    e.preventDefault();
    // dispatch(subscribeCommunity(id));
    dispatch(subscribeCommunity(id, isJoined));
  }


  // const exampleData = {
  //   data: [{
  //     "title": "Travel", "description": "name1", "data_fields": [{ "id": "17", "name": "name3", "dataType": "Image", "data": "https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" }, { "id": "16", "name": "name2", "dataType": "Text", "data": "Deneme test" }],
  //     "posted_by": "Muhammed", "post_date": "10/11/2021", "community": "Boun"
  //   },
  //   {
  //     "title": "Tournement", "description": "name1", "data_fields": [{ "id": "17", "name": "name3", "dataType": "Image", "data": "https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" }, { "id": "16", "name": "name2", "dataType": "Text", "data": "Deneme test" }],
  //     "posted_by": "Emir", "post_date": "11/11/2021", "community": "Cmpe"
  //   },
  //   {
  //     "title": "Tournement", "description": "name1", "data_fields": [{ "id": "17", "name": "name3", "dataType": "Image", "data": "https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" }, { "id": "16", "name": "name2", "dataType": "Text", "data": "Deneme test" }],
  //     "posted_by": "Emir", "post_date": "11/11/2021", "community": "Cmpe"
  //   },
  //   {
  //     "title": "Tournement", "description": "name1", "data_fields": [{ "id": "17", "name": "name3", "dataType": "Image", "data": "https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" }, { "id": "16", "name": "name2", "dataType": "Text", "data": "Deneme test" }],
  //     "posted_by": "Emir", "post_date": "11/11/2021", "community": "Cmpe"
  //   },
  //   {
  //     "title": "Tournement", "description": "name1", "data_fields": [{ "id": "17", "name": "name3", "dataType": "Image", "data": "https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" }, { "id": "16", "name": "name2", "dataType": "Text", "data": "Deneme test" }],
  //     "posted_by": "Emir", "post_date": "11/11/2021", "community": "Cmpe"
  //   }]
  // };
  console.log('communityData: ', communityData);
  return (
    <>
      <div>
        <SideBar />
      </div>

      <div>
        {communityData?.Success ? (
          <Card style={{ width: '50rem', margin: 'auto', marginBottom: "30px" }}>
            <Row>
              <Col>
                <Card.Title>{communityData?.Community?.name}</Card.Title>
              </Col>
              <Col>
                <Card.Title>{communityData?.Community?.description}</Card.Title>
              </Col>
              <Col>
                <Card.Title>Posted by @{communityData?.Community?.moderator}</Card.Title>
              </Col>
            </Row>
            {communityData?.Community["data_fields"]?.map((field) => (
              <Container style={{ width: '45rem', margin: '30px auto', backgroundColor: "gainsboro" }}>
                <div >
                  <Row>
                    <Col>
                      <FormLabel style={{ color: "black" }} > {field["name"]} </FormLabel>
                    </Col>
                    {field["dataType"] === "text" && <Col xs={8}><Card.Text type="text" name="textField">{field["data"]}</Card.Text></Col>}
                    {field["dataType"] === "image" && <Col xs={8}><Card.Img src={field["data"]}></Card.Img>
                    {field["dataType"] === "location" && <Col xs={8}><Card.Text type="text" name="textField">{field["data"]}</Card.Text></Col>}
                    {field["dataType"] === "date" && <Col xs={8}><Card.Text type="text" name="textField">{field["data"]}</Card.Text></Col>}
                    </Col>}
                  </Row>
                </div>
              </Container>
            ))}
          </Card>
        ) : null}

        <div>
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
        </div>
      </div>
    </>
  );
}

export default CommunityPage;