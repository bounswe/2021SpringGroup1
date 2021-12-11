//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Card, Container, ListGroup, ListGroupItem, Button, Form, FormLabel, FormGroup, FormControl, FormFile } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { createCommunity } from 'store/actions/communityAction';
import { isEmpty } from 'utils/methods';
import { useDispatch } from 'react-redux';


const CreateCommunity = (props) => {
  const [isPrivate, setIsPrivate] = useState('');
  const [community_image_url, setCommunity_image_url] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  console.log(isPrivate)
  // const {isLoginSucceed} = useSelector(state=>state.auth)

  useEffect(() => {
    if (false) {
      dispatch({
        type: '',
      })
      // history.push('/landingPage')
    }
  }, [])

  const createCommunityCall = (e) => {
    e.preventDefault();
    if (isEmpty(isPrivate) || isEmpty(community_image_url) || isEmpty(description) || isEmpty(name)) {
      alert('Please Fill All The Fields.');
      return;
    }
    dispatch(createCommunity({ name, description, community_image_url, isPrivate }))
  }

  return (
    <>
      <div>
        <SideBar />
      </div>

      <Container fluid={true} style={{ width: '55rem', margin: '0px auto', backgroundColor: "Lavender" }}>
        <Form>
          <FormGroup className="mb-3">
            <FormLabel style={{ color: "black", fontSize: 30, font: "bold" }}>
              Create Community
            </FormLabel>
          </FormGroup>
          <FormGroup className="mb-3" controlId="formName">
            <FormLabel style={{ color: "black", fontSize: 20, font: "bold" }}>
              Community Name
            </FormLabel>
            <FormControl placeholder="Enter Community Name" type="text" onChange={(text) => setName(text.target.value)}>
            </FormControl>
          </FormGroup>
          <FormGroup className="mb-3" controlId="formDescription">
            <FormLabel style={{ color: "black", fontSize: 20, font: "bold" }}>
              Community Description
            </FormLabel>
            <FormControl as="textarea" rows={3} placeholder="Enter Community Description" type="text" onChange={(text) => setDescription(text.target.value)}>
            </FormControl>
          </FormGroup>
          <FormGroup className="mb-3" controlId="formImageFile">
            <FormLabel style={{ color: "black", fontSize: 20, font: "bold" }}>
              Community Picture
            </FormLabel>
            <FormControl placeholder="Enter Community Picture URL" type="text" onChange={(text) => setCommunity_image_url(text.target.value)}>
            </FormControl>
            {/* <FormFile accept="image/*" onChange={(text) => setCommunity_image_url(text.target.value)}>
            </FormFile> */}
          </FormGroup>
          <FormGroup className="mb-3" controlId="formPrivacy">
            <FormLabel style={{ color: "black", fontSize: 20, font: "bold" }}>
              Community Privacy Option
            </FormLabel>
            <Form.Check type="radio" label="Public" name="formHorizontalRadios" id="formHorizontalRadios1" onClick={() => setIsPrivate('public')} />
            <Form.Check type="radio" label="Private" name="formHorizontalRadios" id="formHorizontalRadios2" onClick={() => setIsPrivate('private')} />
          </FormGroup>
          <Button variant="primary" type="submit" style={{ marginBottom: '10px' }} onClick={e => createCommunityCall(e)}>
            Create Community
          </Button>
          {/* {isRegistered && <Alert variant="success">
        <Alert.Heading>{'Başarıyla Kayıt Oldunuz.'}</Alert.Heading>
      </Alert> } */}
        </Form>
      </Container>
    </>
  );
}

export default CreateCommunity;