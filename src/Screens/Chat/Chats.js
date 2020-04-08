import React from 'react';
import {View, Text} from 'react-native';

function Chat(props) {
  return (
    <>
      <View
        style={{
          borderRadius: 50,
          backgroundColor: 'grey',
          flex: 1,
          marginTop: -10,
          position: 'absolute',
        }}>
        <Text>Hello</Text>
      </View>
    </>
  );
}

export default Chat;
