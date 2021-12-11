//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Button, Card, ListGroup, ListGroupItem, Col, Row, Container, FormLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPosts } from 'store/actions/communityAction';
import MaterialUICard from 'components/card/MaterialUICard'
import PostCard from 'components/card/MaterialUICard';
import myDate from 'utils/methods'


const MyPosts = (props) => {

    const dispatch = useDispatch();
    const { myPosts } = useSelector(state => state.community)
    console.log('myPosts: ', myPosts);
    useEffect(() => {
        dispatch(getMyPosts());
    }, [])
    console.log('myPosts: ', myPosts);
    return (
        <>
            <div>
                <SideBar />
            </div>
            <div>
                {/* {myPosts?.map((posts) => (
                    <Card style={{ width: '50rem', margin: 'auto', marginBottom: "30px" }}>
                        <Row>
                            <Col>
                                <Card.Title>{posts["title"]}</Card.Title>
                            </Col>
                            <Col>
                                <Card.Title>{posts["community"]}</Card.Title>
                            </Col>
                            <Col>
                                <Card.Title>{myDate(posts["created_date"])}</Card.Title>
                            </Col>
                        </Row>
                        {posts["data_fields"].map((field) => (
                            <Container style={{ width: '45rem', margin: '5px auto', backgroundColor: "gainsboro" }}>
                                <div >
                                    <Row>
                                        <Col>
                                            <FormLabel style={{ color: "black" }} > {field["name"]} </FormLabel>
                                        </Col>
                                        {field["type"] === "text" && <Col xs={8}><Card.Text type="text" name="textField">{field["content"][Object.keys(field["content"])[0]]}</Card.Text></Col>}
                                        {field["type"] === "image" && <Col xs={8}><Card.Img src={field["content"][Object.keys(field["content"])[0]]}></Card.Img>
                                        </Col>}
                                    </Row>
                                </div>
                            </Container>
                        ))}
                    </Card>
                ))} */}

                <div>
                    {myPosts && myPosts?.map((posts) => (
                        <PostCard posts={posts} />
                    ))}
                </div>

            </div>
        </>
    );
}

export default MyPosts;