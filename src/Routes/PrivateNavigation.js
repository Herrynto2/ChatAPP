import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatList from '../Screens/Chat/ChatList';
import ChatNavigation from './Components/ChatNavigation';
import ChatID from '../Screens/Chat/ChatID';

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
    </Stack.Navigator>
  );
}

export default PrivateNavigation;
