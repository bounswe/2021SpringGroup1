//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Card, Container, ListGroup, ListGroupItem, Button, Form, FormLabel, FormGroup, FormControl, FormFile } from 'react-bootstrap';
import { useHistory } from "react-router-dom";


const CreateCommunity = (props) => {
  const [isPrivate, setIsPrivate] = useState(false);
  console.log(isPrivate)

  return (
    <>
      <div>
        <SideBar />
      </div>

      <Container fluid={true} style={{ width: '55rem', margin: '0px auto', backgroundColor: "lightblue" }}>
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
            <FormControl placeholder="Enter Community Name" type="text">
            </FormControl>
          </FormGroup>
          <FormGroup className="mb-3" controlId="formDescription">
            <FormLabel style={{ color: "black", fontSize: 20, font: "bold" }}>
              Community Description
            </FormLabel>
            <FormControl placeholder="Enter Community Description" type="text">
            </FormControl>
          </FormGroup>
          <FormGroup className="mb-3" controlId="formImageFile">
            <FormLabel style={{ color: "black", fontSize: 20, font: "bold" }}>
              Community Picture
            </FormLabel>
            <FormFile accept="image/*">
            </FormFile>
          </FormGroup>
          <FormGroup className="mb-3" controlId="formPrivacy">
            <FormLabel style={{ color: "black", fontSize: 20, font: "bold" }}>
              Community Privacy Option
            </FormLabel>
            <Form.Check type="radio" label="Public" name="formHorizontalRadios" id="formHorizontalRadios1" onClick={() => setIsPrivate(false)}/>
            <Form.Check type="radio" label="Private" name="formHorizontalRadios" id="formHorizontalRadios2" onClick={() => setIsPrivate(true)}/>
          </FormGroup>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default CreateCommunity;