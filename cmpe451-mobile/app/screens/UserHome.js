import React from 'react';
import FeedScreen from './FeedScreen';
import AllCommunitiesScreen from './AllCommunitiesScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserCommunitiesScreen from './UserCommunitiesScreen';
import UserPostsScreen from './UserPostsScreen';
import SettingsScreen from './SettingsScreen';
import CreateCommunityScreen from './CreateCommunityScreen';

const Drawer = createDrawerNavigator();

function Home(props) {
    return (
        <Drawer.Navigator initialRouteName="User Communities">
            <Drawer.Screen name="Feed" component={FeedScreen} />
            <Drawer.Screen name="Communities" component={AllCommunitiesScreen} />
            <Drawer.Screen name="User Posts" component={UserPostsScreen}/>
            <Drawer.Screen name="User Communities" component={UserCommunitiesScreen}/>
            <Drawer.Screen name="Create Community" component={CreateCommunityScreen}/>
            <Drawer.Screen name="Settings" component={SettingsScreen}/>

        </Drawer.Navigator>

    );
}

export default Home;