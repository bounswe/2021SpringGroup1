//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Card, Container, ListGroup, ListGroupItem, Button, Row, Col, FormLabel } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCommunityData, getMyPosts, listCommunityPosts, subscribeCommunity } from 'store/actions/communityAction';
import PostCard from 'components/card/MaterialUICard';
import SideCard from 'components/card/SideCard';

const CommunityPage = (props) => {
  let listOfPath = props?.location?.pathname?.split('/');
  let id = listOfPath[listOfPath?.length - 1];
  console.log('id: ', id);
  console.log('props: ', props?.location?.pathname?.split('/'));

  const dispatch = useDispatch();
  const [deletedPosts,setDeletedPosts]= useState(0);
  const { communityData, communityPosts,myPosts } = useSelector(state => state.community)
  console.log('communityData: ', communityData?.Community);
  console.log('communityPosts: ', communityPosts);
  useEffect(() => {
    dispatch(getCommunityData(id));
    dispatch(listCommunityPosts(id));
    dispatch(getMyPosts());


  }, [])

  const subscribeCall = (e, id, isJoined) => {
    e.preventDefault();
    // dispatch(subscribeCommunity(id));
    dispatch(subscribeCommunity(id, isJoined));
  }

  const handleCommunityData = () => {
    dispatch(getCommunityData(id));
}
  const handleCommunityPostsData = async () => {
    let result= await dispatch(listCommunityPosts(id));
    setDeletedPosts(deletedPosts+1);
  }
  let result = myPosts.map(a => a.id);

  console.log('communityData: ', communityData);

  return (
    <>
      <div>
        <SideBar />
      </div>

      <div>
        {/* {communityData?.Success && communityData["Posts"].map((posts) => (
          <Card style={{ width: '50rem', margin: 'auto', marginBottom: "30px" }}>
            <Row>
              <Col>
                <Card.Title>{posts["title"]}</Card.Title>
              </Col>
              <Col>
                <Card.Title>{posts["community"]}</Card.Title>
              </Col>
              <Col>
                <Card.Title>Posted by @{posts["poster"]}</Card.Title>
              </Col>
            </Row>
            {posts["data_fields"].map((field) => (
              <Container style={{ width: '45rem', margin: '30px auto', backgroundColor: "gainsboro" }}>
                <div >
                  <Row>
                    <Col>
                      <FormLabel style={{ color: "black" }} > {field["name"]} </FormLabel>
                    </Col>
                    <Col>
                      {field["type"] === "text" && <Card.Text type="text" name="textField">{field["content"][Object.keys(field["content"])[0]]}</Card.Text>}
                      {field["type"] === "image" && <Card.Img src={field["content"][Object.keys(field["content"])[0]]}></Card.Img>}
                      {field["type"] === "location" && <Card.Text type="text" name="locField">{field["content"][Object.keys(field["content"])[0]]}</Card.Text>}
                      {field["type"] === "date" && <Card.Text type="text" name="dateField">{field["content"][Object.keys(field["content"])[0]]}</Card.Text>}
                    </Col>
                  </Row>
                </div>
              </Container>
            ))}
          </Card>
        ))} */}

        <div>
          {communityPosts?.length > 0 && communityPosts.map((posts) => (
            <PostCard posts={posts} canDelete={result.includes(posts.id)? true:false} handleParentData={handleCommunityPostsData}/>
          ))}
        </div>


        <SideCard props={props} communityData={communityData} handleCommunityData={handleCommunityData}/>

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
      </div>
    </>
  );
}

export default CommunityPage;