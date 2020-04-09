import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Text,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import User from '../../../Helper/Image/user3.jpg';

function Header(props) {
  return (
    <>
      <View style={style.container}>
        <TouchableOpacity
          style={{width: 50, marginTop: 35}}
          onPress={() => props.navigation.goBack()}>
          <Icons name="chevron-left" size={20} style={style.backIcon} />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={{height: 50, marginTop: -38}}>
            <Image
              source={User}
              style={{
                width: 50,
                height: 50,
                borderRadius: 17,
                marginHorizontal: 7,
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </TouchableOpacity>
          <Text style={{color: '#bfd8ff', fontSize: 12, marginTop: 5}}>
            Putri Ayu
          </Text>
        </View>
      </View>
    </>
  );
}

export default Header;

const style = StyleSheet.create({
  container: {
    backgroundColor: '#1e57b6',
    height: 150,
    marginBottom: -50,
  },
  backIcon: {
    color: '#bfd8ff',
    marginLeft: 20,
    width: 20,
  },
});
