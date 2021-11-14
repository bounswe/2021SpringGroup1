import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem, FaHeart, FaRegRegistered } from "react-icons/fa";
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


export const SideBar = props => {
    const [isCollabsed, setIsCollabsed] = useState(true);
    const history = useHistory();
    console.log('history: ', history);
    return (
        <ProSidebar collapsed={isCollabsed} style={{ position: 'fixed' }} onMouseLeave={() => setIsCollabsed(true)} onMouseOver={() => setIsCollabsed(false)}>
            <Menu iconShape="square">
                <MenuItem onClick={() => history.push('/landingPage')} icon={<FaGem />}>Feed</MenuItem>
                <MenuItem onClick={() => history.push('/createPostTemplate')} icon={<FaGem />}>Communities</MenuItem>
                <MenuItem onClick={() => history.push('/createPostPage')} icon={<FaGem />}>My Posts</MenuItem>
                <MenuItem onClick={() => history.push('/')} icon={<FaGem />}>My Communities</MenuItem>
                <MenuItem onClick={() => history.push('/')} icon={<FaGem />}>My Profile</MenuItem>
                <MenuItem onClick={() => history.push('/')} icon={<FaGem />}>Logout</MenuItem>
            </Menu>
        </ProSidebar>
    )
}

export default SideBar
