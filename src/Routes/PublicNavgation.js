import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/Auth/Login';
import RegisterScreen from '../Screens/Auth/Register';
import CheckContact from '../Screens/Auth/CheckContact';
import Verify from '../Screens/Auth/Verify';
import ResetPassword from '../Screens/Auth/ResetPasword';
import StartScreen from '../Screens/Auth/StartScreen';
import Success from '../Screens/Auth/Success';

function PublicNavigation(props) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="CheckContact" component={CheckContact} />
      <Stack.Screen name="Verify" component={Verify} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
  );
}

export default PublicNavigation;
