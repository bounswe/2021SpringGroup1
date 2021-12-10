//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { subscribeCommunity } from 'store/actions/communityAction';

export default function SideCard({ props, communityData }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const subscribeCall = (e, id, isJoined) => {
        e.preventDefault();
        // dispatch(subscribeCommunity(id));
        dispatch(subscribeCommunity(id, isJoined));
    }
    return (
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
                        <Button onClick={() => history.push('/community/' + props.match.params.id)} variant="success">Feed Page</Button>{' '}
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

    );
}