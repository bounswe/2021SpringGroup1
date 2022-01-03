import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem, FaHeart, FaRegRegistered } from "react-icons/fa";
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { logout } from 'store/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'utils/methods';


export const SideBar = props => {
    const [isCollabsed, setIsCollabsed] = useState(true);
  const { token } = useSelector(state => state.auth)

    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <ProSidebar collapsed={isCollabsed} style={{ position: 'fixed' }} onMouseLeave={() => setIsCollabsed(true)} onMouseOver={() => setIsCollabsed(false)}>
            <Menu iconShape="square">
                <MenuItem onClick={() => history.push('/landingPage')} icon={<FaGem />}>Feed</MenuItem>
                <MenuItem onClick={() => history.push('/createCommunity')} icon={<FaGem />}>Create Community</MenuItem>
                <MenuItem onClick={() => history.push('/allCommunities')} icon={<FaGem />}>Communities</MenuItem>
                <MenuItem onClick={() => history.push('/myCommunities')} icon={<FaGem />}>My Subscriptions</MenuItem>
                <MenuItem onClick={() => history.push('/myPosts')} icon={<FaGem />}>My Posts</MenuItem>
                {!isEmpty(token) && <MenuItem onClick={() => history.push('/profile')} icon={<FaGem />}>Profile</MenuItem>}
                <MenuItem onClick={() => {dispatch(logout());history.push('/')}} icon={<FaGem />}>Logout</MenuItem>
            </Menu>
        </ProSidebar>
    )
}

export default SideBar
