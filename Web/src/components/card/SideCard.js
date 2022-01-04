//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { subscribeCommunity } from 'store/actions/communityAction';

export default function SideCard({ props, communityData,handleCommunityData }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const subscribeCall = async (e, id, isJoined) => {
        e.preventDefault();
        // dispatch(subscribeCommunity(id));
        const result= await dispatch(subscribeCommunity(id, isJoined));
        handleCommunityData();
    }
    
    return (
        <div>
            <Card style={{ width: '15rem', margin: 'auto', position: "absolute", right: "5px", top: "5px",backgroundColor:"cornsilk" }}>
                <Card.Img variant="top" src={communityData?.Community?.community_image_url} />
                <Card.Body style={{backgroundColor:"cornsilk"}}>
                    <Card.Title style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>{communityData?.Community?.name}</Card.Title>
                    <Card.Text>
                        {communityData?.Community?.description}
                    </Card.Text>


                </Card.Body >
                <ListGroup className="list-group-flush">
                    <ListGroupItem style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:"cornsilk"
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
                        backgroundColor:"cornsilk"

                    }}>
                        <Button onClick={() => history.push('/community/' + props.match.params.id)} variant="success">Feed Page</Button>{' '}
                    </ListGroupItem>
                    {communityData?.Community?.isJoined &&
                    <ListGroupItem style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:"cornsilk"

                    }}>
                        <Button onClick={() => history.push('/community/createPostPage/' + props.match.params.id)} variant="success">Create Post</Button>{' '}
                    </ListGroupItem>}
                    {!communityData?.Community?.isJoined &&
                    <ListGroupItem style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:"cornsilk"
                    }}>
                        <Button onClick={() => history.push('/community/createPostPage/' + props.match.params.id)} variant="secondary" disabled>Create Post</Button>{' '}
                    </ListGroupItem>}
                    {communityData?.Community?.isJoined &&
                    <ListGroupItem style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:"cornsilk"
                    }}>
                        <Button onClick={() => history.push('/community/createPostTemplate/' + props.match.params.id)} variant="success">Create Post Template</Button>{' '}
                    </ListGroupItem>}
                    {!communityData?.Community?.isJoined &&
                    <ListGroupItem style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:"cornsilk"
                    }}>
                        <Button onClick={() => history.push('/community/createPostTemplate/' + props.match.params.id)} variant="secondary" disabled>Create Post Template</Button>{' '}
                    </ListGroupItem>}
                </ListGroup>
            </Card>
        </div>

    );
}