//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Card, Container, ListGroup, ListGroupItem, Row, Col, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import 'assets/css/communitiesPage.css';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getMyCommunities } from 'store/actions/communityAction';

const MyCommunitiesPage = props => {
  var xd = "Title";
  const history = useHistory();
  const dispatch = useDispatch();
  const {myCommunities} = useSelector(state => state.community)
  console.log('myCommunities: ' , myCommunities);
  useEffect(()=>{
      dispatch(getMyCommunities({from: 'joined'}));
  },[])

  const exampleData = {
    data: [{ "id": "15", "description": "abasdfsafdafafda safdaf adsfdsaf da fsda fdsaf dsas fdsafsdfds.", "name": "Community name1", "community_image_url": "https://github.com/gautam-in/shopping-cart-assignment/blob/master/static/images/logo.png?raw=true" }
      , { "id": "15", "description": "abasdfsafdafafda safdaf adsfdsaf da fsda fdsaf dsas fdsafsdfds.", "name": "Community name1", "community_image_url": "https://github.com/gautam-in/shopping-cart-assignment/blob/master/static/images/logo.png?raw=true" }]
  };


  return (

    <>

      <div>
        <SideBar />
      </div>

      <div>
        {myCommunities?.Community?.map((community) => (
          <Container style={{ width: '55rem', margin: '0px auto', backgroundColor: "gainsboro", marginBottom: "30px" }}>
            <div >
              <Row>
                <Col>
                  <Image style={{ height: "120px", width: "120px" }} src={community["community_image_url"]} />
                </Col>
                <Col xs={8}>
                  <a onClick={() => history.push('/community/' + community.id)} style={{ cursor: 'pointer', fontSize: "26px" }} id="linkid"> {community.name}</a>
                  <p></p>
                  <br></br>
                  <p>{community.description} </p>
                </Col>
                <Col style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Button variant="success">Subscribe</Button>{' '}
                </Col>
              </Row>
            </div>
          </Container>
        ))}
      </div>
    </>
  );
}

export default MyCommunitiesPage;
