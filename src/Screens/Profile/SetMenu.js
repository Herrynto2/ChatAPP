import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import user from '../../Helper/Image/users.png';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {YellowBox} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {userLogout} from '../../Redux/Actions/userDataAction';
import {useNavigation} from '@react-navigation/native';

YellowBox.ignoreWarnings(['Warning: Failed prop type: Invalid prop']);

function SetMenu(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {dataProfile, dataUser} = useSelector(state => state.userData);

  return (
    <View>
      <Overlay
        isVisible={props.isVisible}
        windowBackgroundColor="rgba(46, 46, 46, .5)"
        overlayBackgroundColor="white"
        width={220}
        height={'80%'}
        borderRadius={0}
        style={{padding: 0}}
        overlayStyle={style.container}>
        <View style={{backgroundColor: '#1d57b6'}}>
          <View style={{alignSelf: 'center', height: 80}}>
            <TouchableOpacity
              style={{height: 110, marginTop: 30}}
              onPress={() => {
                navigation.navigate('Profile');
                props.setHideVisible(false);
              }}>
              <Image source={user} style={style.imgUser} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Text style={style.nameUser}>
            {dataProfile.fullname || dataUser.email.substring(0, 8)}
          </Text>
          <Text style={{...style.nameUser, backgroundColor: 'transpare'}}>
            {dataProfile.information}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={style.closeMenu}
            onPress={() => {
              props.setHideVisible(false);
            }}>
            <Icons name="chevron-left" size={20} style={style.backIcon} />
          </TouchableOpacity>
        </View>
        <View style={style.containerLogout}>
          <Button
            title="Logout"
            icon={<Icons name="sign-out-alt" size={16} color="white" />}
            onPress={async () => await dispatch(userLogout())}
            buttonStyle={style.btnLogout}
            label
          />
        </View>
      </Overlay>
    </View>
  );
}

const style = StyleSheet.create({
  confirm: {
    marginTop: 40,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#1d57b6',
    elevation: 4,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomRightRadius: 100,
  },
  backIcon: {
    color: '#a7a7a7',
    marginLeft: 10,
    width: 20,
  },
  closeMenu: {
    width: 50,
    marginTop: 25,
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    width: 30,
    elevation: 4,
    position: 'absolute',
    right: 0,
    marginRight: -10,
    marginTop: 50,
  },
  imgUser: {
    width: 110,
    height: 110,
    borderRadius: 30,
    marginBottom: -150,
    borderWidth: 6,
    borderColor: 'white',
  },
  nameUser: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 65,
    backgroundColor: '#4b84e9',
    width: '50%',
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  containerLogout: {
    marginTop: 100,
    height: '27%',
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',

    borderBottomRightRadius: 100,
  },
  btnLogout: {
    backgroundColor: '#1d57b6',
    borderBottomRightRadius: 100,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderRadius: 0,
    width: 150,
    borderWidth: 6,
    borderColor: 'white',
  },
});
export default SetMenu;
