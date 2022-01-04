//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Card, Container, ListGroup, ListGroupItem, Row, Col, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import 'assets/css/communitiesPage.css';
import { useHistory} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCommunities, subscribeCommunity } from 'store/actions/communityAction';
import SearchBar from 'components/SearchBar';

const AllCommunitiesPage = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchDone,setSearchDone]= useState(false)
  const { communities } = useSelector(state => state.community)
  console.log('communities: ', communities);
  useEffect(() => {
    dispatch(getCommunities({ from: 'all' }));
    console.log("effect");
  }, [])

  const subscribeCall = async (e, id, isJoined) => {
    e.preventDefault();
    const response= await dispatch(subscribeCommunity(id,isJoined));
    dispatch(getCommunities({ from: 'all' }));

  }
  const searchDoneFunction=  () => {
    console.log(communities);
    setSearchDone(!searchDone);

  }

  return (
    <>
      <div>
        <SideBar />
        
      </div>
      <div style={{position:'absolute',right: "5px", top: "5px", border:"1px solid black"}}><SearchBar setFunction={searchDoneFunction}></SearchBar></div>
      <div>
        {communities?.Communities?.length > 0 && communities?.Communities?.map((community) => (
          <Container class="rounded-3" style={{border:"5px solid #09324c",borderRadius:"20px" ,width:'55rem', margin:'auto', backgroundColor: "#105480", marginBottom: "25px"}}>
            <div >
              <Row>
                <Col>
                  <Image onClick={() => history.push('/community/' + community.id)} roundedCircle style={{marginTop:'10px',marginBottom:'10px', height: "120px", width: "120px" }} src={community["community_image_url"]} />
                </Col>
                <Col xs={8}>
                  <a onClick={() => history.push('/community/' + community.id)} style={{ cursor: 'pointer', fontSize: "26px" }} id="linkid"> {community.name}</a>
                  <p></p>
                  <br></br>
                  <br></br>
                  <p style={{ color:"white"}}>{community["description"]} </p>
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
