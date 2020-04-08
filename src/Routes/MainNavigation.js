import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PrivateNavigation from './PrivateNavigation';
import PublicNavigation from './PublicNavgation';

function MainRoutes(props) {
  const [isLogin, setIsLogin] = React.useState(true);

  if (!isLogin) {
    return <PrivateNavigation />;
  } else {
    return <PublicNavigation />;
  }
}

function MainNavigation(props) {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="MainRoutes" component={MainRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainNavigation;
