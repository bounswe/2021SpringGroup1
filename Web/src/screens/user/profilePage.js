//React Library
import { Avatar, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import PostCard from 'components/card/MaterialUICard';
import SideBar from 'components/navbar/SideBar';
import React, {useState,useEffect,} from 'react';
import { Alert, Col, Container, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getProfile } from 'store/actions/profileAction';
import MaterialCard from '@mui/material/Card';
import faker from 'faker/locale/tr';
import { red } from '@mui/material/colors';
import { isEmpty } from 'utils/methods';
import Button from 'components/button/Button';


const styles = {
    screen: {
    position:"absolute",
    top:'50%',
    left: '50%',
    transform: "translate(-50%, -50%)",
    color:"red",
    fontSize:55,
  }
}


const ProfilePage = (props) => {
  const history = useHistory();
  const { profileInfo } = useSelector(state => state.profile)
  const dispatch = useDispatch();
  let listOfPath = props?.location?.pathname?.split('/');
  let id = listOfPath[listOfPath?.length - 1];
  console.log('profileInfo: ' , profileInfo);


  useEffect(() => {
    if(id === 'profile' || id === 0 || id === '0') {
      dispatch(getProfile());
      return;
    }
    dispatch(getProfile(id));
  }, [id])


  return (

      <>
       <div>
        <SideBar />
      </div>
      <MaterialCard sx={{ maxWidth: 900, margin: 'auto', backgroundColor: 'Highlight', marginBlockEnd: '20px' }}>
            <CardContent>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} src={faker.image?.avatar} aria-label="recipe">
                        
                    </Avatar>
                }
                title={'Profile Picture'}
                // title={myDate(posts["created_date"])}
            />
                <Row>
                    <Col sm={2}>
                        <Typography variant="body2" color="text.first">
                            Username:
                        </Typography>
                    </Col>
                    <Col>
                        <Typography variant="body2" color="text.first">
                            {profileInfo?.User?.username}
                        </Typography>
                    </Col>
                </Row>
                <Row>
                    <Col sm={2}>
                        <Typography variant="body2" color="text.first">
                            Email:
                        </Typography>
                    </Col>
                    <Col>
                        <Typography variant="body2" color="text.first">
                            {profileInfo?.User?.email}
                        </Typography>
                    </Col>
                </Row>

            </CardContent>


            <div style={{marginTop: '40px'}}>
                    {
                      profileInfo?.User?.user_posts?.map((posts) => (
                        <PostCard posts={posts} />
                      ))
                    }
                </div>

            {isEmpty(profileInfo?.User?.user_posts) && 
                <div style={{marginTop: '40px', maxWidth: '800px', margin: 'auto', justifyContent: 'center', alignItems: 'center', minWidth: '500px'}}>
                <Alert variant={'danger'}>
                  <Alert.Heading>{"Not Found!"}</Alert.Heading>
                  <p>{"No User Posts Found !"}</p>
                  </Alert>
                </div>
            }



  {profileInfo?.User?.joined_communities?.length > 0 && profileInfo?.User?.joined_communities?.map((community) => (
          <Container class="rounded-3" style={{border:"5px solid #09324c", marginTop: '40px', borderRadius:"20px" ,width:'55rem', margin:'auto', backgroundColor: "#105480", marginBottom: "25px"}}>
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
                </Col>
              </Row>
            </div>
          </Container>
        ))}


            {profileInfo?.User?.joined_communities?.length <= 0 &&
                <div style={{marginTop: '40px', maxWidth: '800px', margin: 'auto', justifyContent: 'center', alignItems: 'center', minWidth: '500px'}}>
                <Alert variant={'danger'}>
                  <Alert.Heading>{"Not Found!"}</Alert.Heading>
                  <p>{"No User Community Found !"}</p>
                  </Alert>
                </div>
            }

          </MaterialCard>
      </>
  );
}

export default ProfilePage;