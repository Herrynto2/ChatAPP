import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import Profile from '../../Screens/Profile/Profile';
import Icon from 'react-native-vector-icons/FontAwesome5';

function BottomNavigation(props) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Profile':
              iconName = 'portrait';
              break;
            // case 'ScanQR':
            //   iconName = 'qrcode';
            //   return (
            //     <LinearGradient
            //       colors={['#5eccbc', '#3f7e77']}
            //       style={{
            //         position: 'absolute',
            //         backgroundColor: '#5eccbc',
            //         width: 60,
            //         height: 60,
            //         top: -20,
            //         borderRadius: 50,
            //         borderWidth: 3,
            //         borderColor: 'white',
            //         elevation: 3,
            //         alignItems: 'center',
            //         justifyContent: 'center',
            //       }}>
            //       <View>
            //         <Icon name={iconName} size={25} color="white" />
            //       </View>
            //     </LinearGradient>
            //   );
            default:
              iconName = 'opencart';
              break;
          }
          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#868989',
        showLabel: false,
        style: {
          position: 'relative',
          backgroundColor: '#1e58b6',
        },
      }}>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: true}}
      />
      {/* <Tab.Screen name="ScanQR" component={ScanQR} />
      <Tab.Screen name="Profile" component={Profile} /> */}
    </Tab.Navigator>
  );
}

export default BottomNavigation;
