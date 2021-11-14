//React Library
import React, {useState,useEffect,} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {urls} from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import {Card, Container, ListGroup, ListGroupItem,Button} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import { useHistory } from "react-router-dom";

const CommunityPage = (props) => {
    const history= useHistory();
    return (
  
      <>
      <div>
      <SideBar /> 
      
      </div>
      <h> </h>
      <div>
      <Card style={{ width: '50rem', margin: 'auto' }}>
        <Card.Title>Card Title</Card.Title>

        <div class="latest-photos">
            <div class="row"><div class="col-md-4"> 
        <figure> <img class="img-fluid" src="https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" alt=""/> 
        </figure></div><div class="col-md-4"> <figure> <img class="img-fluid" src="https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" alt=""/> 
        </figure></div><div class="col-md-4"> <figure> <img class="img-fluid" src="https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" alt=""/> 
        </figure></div><div class="col-md-4"> <figure> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar4.png" alt=""/> 
        </figure></div><div class="col-md-4"> <figure> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar5.png" alt=""/> 
        </figure></div><div class="col-md-4"> <figure> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar6.png" alt=""/> 
        </figure></div><div class="col-md-4"> <figure class="mb-0"> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""/> 
        </figure></div><div class="col-md-4"> <figure class="mb-0"> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar8.png" alt=""/> 
        </figure></div><div class="col-md-4"> <figure class="mb-0"> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar9.png" alt=""/> 
        </figure></div></div></div>
        <Card.Body>
           
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroupItem>Cras justo odio</ListGroupItem>
            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
        <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
        </Card> 
        <Card style={{ width: '50rem', margin: '30px auto' }}>
        <Card.Img variant="top" src="https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" />
        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroupItem>Cras justo odio</ListGroupItem>
            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
        <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
        </Card> 

        <div>
            <Card style={{ width: '15rem', margin: 'auto',position:"absolute",right: "5px",top: "5px" }}>
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
        <Button onClick={()=>history.push('/community/createPostPage/'+props.match.params.id)} variant="success">Create Post</Button>{' '}
        </ListGroupItem>
        <ListGroupItem style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
        <Button onClick={()=>history.push('/community/createPostTemplate/'+props.match.params.id)} variant="success">Create Post Template</Button>{' '}
        </ListGroupItem>
        </ListGroup>
            </Card>
        </div>
      </div>
        </>
    );
  }
  
  export default CommunityPage;