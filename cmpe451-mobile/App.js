import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './app/screens/UserHome';
import PostScreen from './app/screens/PostScreen';
import CommunityScreen from './app/screens/CommunityScreen';
import CreatePostTemplateScreen from './app/screens/CreatePostTemplateScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown:false}}
          name="Welcome"
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          />
        <Stack.Screen
          options={{headerShown:false}}
          name="Home"
          component={Home}
          />
          <Stack.Screen
            name="Post"
            component={PostScreen}
            />
          <Stack.Screen
            name="Community"
            component={CommunityScreen}
            />
          <Stack.Screen
            name="CreatePostTemplate"
            component={CreatePostTemplateScreen}
            />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



