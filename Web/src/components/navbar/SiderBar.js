import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem, FaHeart, FaRegRegistered } from "react-icons/fa";
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
export const SideBar = props => {
    const [isCollabsed, setIsCollabsed] = useState(true);
    const history = useHistory();
    console.log('history: ' ,history);
    return (
        <ProSidebar collapsed={isCollabsed} style={{position: 'absolute'}} onMouseLeave={()=>setIsCollabsed(true)} onMouseOver={()=>setIsCollabsed(false)}>
            <Menu iconShape="square">
                <MenuItem onClick={()=>history.push('/')} icon={<FaGem />}>home</MenuItem>
                <SubMenu title="Components" icon={<FaHeart />}>
                    <MenuItem icon={<FaGem />} onClick={()=>history.push('/bootstrap')}>bootstrap</MenuItem>
                    <MenuItem onClick={()=>history.push('/profile')}>profile</MenuItem>
                </SubMenu>
            </Menu>
        </ProSidebar>
    )
}
 
export default SideBar
