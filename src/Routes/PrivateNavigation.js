import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatList from '../Screens/Chat/ChatList';
import ChatNavigation from './Components/ChatNavigation';
import ChatID from '../Screens/Chat/ChatID';
import Profile from '../Screens/Profile/Profile';
import SetMenu from '../Screens/Profile/SetMenu';

function PrivateNavigation(props) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ChatNavigation" component={ChatNavigation} />
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="ChatID" component={ChatID} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SetMenu" component={SetMenu} />
    </Stack.Navigator>
  );
}

export default PrivateNavigation;
