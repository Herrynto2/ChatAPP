import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';

function ChatID(props) {
  return (
    <>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{width: 50, marginTop: 25}}
            onPress={() => props.navigation.goBack()}>
            <Icons name="chevron-left" size={20} style={style.backIcon} />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={style.title}>Log in</Text>
          </View>
        </View>
        <View style={{flex: 6}} />
      </View>
    </>
  );
}

export default ChatID;

const style = StyleSheet.create({
  backIcon: {
    color: '#4f4f4f',
    marginLeft: 15,
    width: 20,
  },
  title: {
    marginTop: -20,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#393939',
  },
});
