//React Library
import React, {useState,useEffect,} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {urls} from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import {Card, Container, ListGroup, ListGroupItem,Button} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import { useHistory } from "react-router-dom";

const CreateCommunity = (props) => {
    const history= useHistory();
    return (
  
      <>
      <div>
      <SideBar /> 
      
      </div>
     
        </>
    );
  }
  
  export default CreateCommunity;