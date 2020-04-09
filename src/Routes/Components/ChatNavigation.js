import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from './Header';
import Footer from './Footer';
import ChatList from '../../Screens/Chat/ChatList';
import Profile from '../../Screens/Profile/Profile';

const Tab = createMaterialTopTabNavigator();

export default function ChatNavigation() {
  return (
    <>
      <Header />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            switch (route.name) {
              case 'Chat':
                iconName = 'upload';
                break;
              case 'Contact':
                iconName = 'sign-in-alt';
                break;
              default:
                iconName = 'opencart';
                break;
            }
            return <Icon name={iconName} size={16} color={color} />;
          },
        })}
        tabBarOptions={{
          showIcon: false,
          activeTintColor: 'white',
          inactiveTintColor: '#6495e0',
          pressColor: 'grey',
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
        <Tab.Screen
          name="Chat"
          component={ChatList}
          style={{position: 'relative'}}
        />
        <Tab.Screen
          name="Friends"
          component={Profile}
          style={{position: 'relative'}}
        />
      </Tab.Navigator>
      <Footer />
    </>
  );
}
