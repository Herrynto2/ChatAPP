import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Header from './Header';
import Footer from './Footer';
import ChatList from '../../Screens/Chat/ChatList';
import Maps from '../../Screens/Maps/Maps';
import Contact from '../../Screens/Contact/Contact';

const Tab = createMaterialTopTabNavigator();

export default function ChatNavigation() {
  return (
    <>
      <Header />
      <Tab.Navigator
        tabBarOptions={{
          showIcon: false,
          activeTintColor: 'white',
          inactiveTintColor: '#6495e0',
          pressColor: '#5dbeee',
          pressOpacity: 'black',

          labelStyle: {
            fontSize: 17,
            marginLeft: -5,
            textTransform: 'capitalize',
            marginTop: -10,
          },
          indicatorStyle: {backgroundColor: 'transparent'},
          style: {
            backgroundColor: '#1d57b6',
            borderRadius: 0,
            width: '100%',
            alignSelf: 'center',
            elevation: 0,
            height: 70,
          },
        }}>
        <Tab.Screen name="Chat" component={ChatList} />
        <Tab.Screen name="Friends" component={Contact} />
        <Tab.Screen name="Maps" component={Maps} />
      </Tab.Navigator>
      <Footer />
    </>
  );
}
