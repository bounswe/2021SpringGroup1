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
                <div>
                    {myPosts?.length > 0 && myPosts?.map((posts) => (
                        <PostCard posts={posts} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default MyPosts;