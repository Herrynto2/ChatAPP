import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Image, Button} from 'react-native-elements';
import Youme from '../../Helper/Image/youme.png';
import Icons from 'react-native-vector-icons/FontAwesome5';

function StartScreen(props) {
  return (
    <>
      <View style={style.container}>
        <View style={style.content}>
          <Image source={Youme} style={style.images} />
          <View style={style.input}>
            <View style={style.containerInfo}>
              <Text
                style={{color: '#2a2a2a', fontSize: 20, fontWeight: 'bold'}}>
                Welcome
              </Text>
              <Text style={style.textInfo}>
                App allows to take picture of your receipts and save the receipt
                information
              </Text>
            </View>
            <View style={style.containerButton}>
              <Button
                title="Login"
                buttonStyle={style.button}
                onPress={() => props.navigation.navigate('Login')}
              />
              <Button
                title="Sign Up"
                buttonStyle={style.buttons}
                titleStyle={{color: '#454a4d'}}
                onPress={() => props.navigation.navigate('Register')}
              />
            </View>
          </View>
          <Text style={style.textSignup}>Or via social media</Text>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Button
                icon={<Icons name="facebook-f" size={16} color="white" />}
                buttonStyle={style.anotherLogin}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Button
                icon={<Icons name="google" size={16} color="white" />}
                buttonStyle={{
                  ...style.anotherLogin,
                  backgroundColor: '#df4c4f',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
export default StartScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    marginTop: -20,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#393939',
  },
  content: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  images: {
    width: 205,
    height: 50,
    marginBottom: 90,
  },
  input: {
    marginTop: 25,
  },
  button: {
    backgroundColor: '#1d57b6',
    width: 130,
    height: 47,
    marginHorizontal: 10,
    borderRadius: 40,
    marginTop: 20,
  },
  buttons: {
    backgroundColor: 'transparent',
    width: 130,
    borderWidth: 3,
    borderColor: '#454a4d',
    marginHorizontal: 10,
    borderRadius: 40,
    marginTop: 20,
  },

  anotherLogin: {
    borderRadius: 100,
    width: 35,
    marginTop: 20,
    marginHorizontal: 8,
  },
  textSignup: {
    marginTop: 14,
    fontSize: 13,
    color: '#979ca1',
    marginRight: 5,
  },
  containerInfo: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  textInfo: {
    textAlign: 'center',
    color: '#b5b7b8',
    fontSize: 13,
    marginTop: 15,
    marginBottom: 25,
  },
  containerButton: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 25,
  },
});
