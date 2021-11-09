import React from 'react';
import FeedScreen from './FeedScreen';
import CommunitiesScreen from './CommunitiesScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserCommunitiesScreen from './UserCommunitiesScreen';
import UserPostsScreen from './UserPostsScreen';
import SettingsScreen from './SettingsScreen';


const Drawer = createDrawerNavigator();

function Home(props) {
    return (
        <Drawer.Navigator initialRouteName="Feed">
            <Drawer.Screen name="Feed" component={FeedScreen} />
            <Drawer.Screen name="Communities" component={CommunitiesScreen} />
            <Drawer.Screen name="UserPosts" component={UserPostsScreen}/>
            <Drawer.Screen name="UserCommunities" component={UserCommunitiesScreen}/>
            <Drawer.Screen name="Settings" component={SettingsScreen}/>
        </Drawer.Navigator>

    );
}

export default Home;