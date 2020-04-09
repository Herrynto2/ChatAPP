import React from 'react';
import {View, Text} from 'react-native';

function Profile(props) {
  return (
    <>
      <View
        style={{
          borderRadius: 50,
          backgroundColor: 'white',
          flex: 1,
          marginBottom: -50,
        }}>
        <Text>Hello</Text>
      </View>
    </>
  );
}

export default Profile;
