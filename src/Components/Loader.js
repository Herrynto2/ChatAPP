import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Button, Overlay} from 'react-native-elements';

function Loader(props) {
  return (
    <View>
      <Overlay
        isVisible={props.loading}
        windowBackgroundColor="rgba(46, 46, 46, .5)"
        overlayBackgroundColor="transparent"
        borderWidth={0}
        width={300}
        height={180}
        borderRadius={20}
        style={{padding: 20}}
        overlayStyle={{padding: 20, paddingTop: 40, elevation: 0}}>
        <View>
          <ActivityIndicator size="large" color="white" />
        </View>
      </Overlay>
    </View>
  );
}

const style = StyleSheet.create({
  confirm: {
    marginTop: 50,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#53C9BE',
    elevation: 4,
  },
});
export default Loader;
