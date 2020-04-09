import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';

function Header(props) {
  return (
    <>
      <View style={style.container}>
        <TouchableOpacity style={{width: 50, marginTop: 25}}>
          <Icons name="stream" size={16} style={style.backIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={{width: 50, marginTop: 25}}>
          <Icons
            name="user-plus"
            size={16}
            style={{...style.backIcon, marginLeft: 260}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Header;

const style = StyleSheet.create({
  container: {
    backgroundColor: '#1e57b6',
    height: 70,
    flexDirection: 'row',
  },
  backIcon: {
    color: '#bfd8ff',
    marginLeft: 20,
    width: 20,
  },
});
