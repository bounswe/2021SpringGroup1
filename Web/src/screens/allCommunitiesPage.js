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
import { getCommunities, subscribeCommunity } from 'store/actions/communityAction';

const AllCommunitiesPage = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { communities } = useSelector(state => state.community)
  const [subButton, setSubButton] = useState(false);
  console.log('communities: ', communities);
  useEffect(() => {
    dispatch(getCommunities({ from: 'all' }));
  }, [])

  const subscribeCall = (e, id, isJoined) => {
    e.preventDefault();
    // dispatch(subscribeCommunity(id));
    dispatch(subscribeCommunity(id, isJoined));
  }

  return (
    <>
      <div>
        <SideBar />
      </div>

      <div>
        {communities?.Communities?.length > 0 && communities?.Communities?.map((community) => (
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
                  <Button variant={community?.isJoined ? 'danger' : 'success'} onClick={e => subscribeCall(e, community?.id, community?.isJoined)}>{community?.isJoined ? 'Unsubscribe' : 'Subscribe'}</Button>{' '}
                </Col>
              </Row>
            </div>
          </Container>
        ))}
      </div>
    </>
  );
}

export default AllCommunitiesPage;
