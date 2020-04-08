import React from 'react';
import {View, Text} from 'react-native';
import ChatTop from '../../Screens/Chat/ChatTop';

function Footer(props) {
  return (
    <>
      <View
        style={{
          borderRadius: 50,
          backgroundColor: '#ebeaee',
          flex: 1,
          marginTop: 122,
          position: 'absolute',
          width: '100%',

          height: 33,
        }}
      />
    </>
  );
}

export default Footer;
