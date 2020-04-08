import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {Image, Input, Button, Icon} from 'react-native-elements';
import Reset from '../../Helper/Image/reset.jpg';
import OverlayImg from '../../Components/OverlaySuccess';
import Icons from 'react-native-vector-icons/FontAwesome5';
import CustomAlert from '../../Components/CustomAlert';
import CustomInputText from '../../Components/CustomInputText';
import * as Yup from 'yup';
import Loader from '../../Components/Loader';
import {useFormik} from 'formik';

function ResetPassword(props) {
  const [hidePassword, setHidePassword] = React.useState(true);
  const [isVisible, setHideVisible] = React.useState(false);

  const FormResetPass = useFormik({
    initialValues: {
      verification_code: '',
      new_password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      verification_code: Yup.string()
        .required('verification code is Required')
        .min(6, 'verification code Must have min 6 character'),
      new_password: Yup.string()
        .required('password is Required')
        .min(8, 'password Must have min 8 character'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('new_password')], 'Confirm Password Not Match')
        .required('Confirm Password Is Required'),
    }),
    onSubmit: async (values, form) => {
      setLoading(true);
      try {
        CustomAlert(true, 'Login success');
        console.log('message');
      } catch (err) {}
      setLoading(false);
    },
  });

  return (
    <>
      <View style={style.container}>
        {isVisible && (
          <OverlayImg
            message={'Success To Changes Password'}
            isVisible={isVisible}
            setHideVisible={setHideVisible}
            onPressOk={() => {
              props.navigation.navigate('Login');
            }}
          />
        )}
        <View style={{flex: 1, paddingBottom: 30}}>
          <TouchableOpacity
            style={{width: 50, marginTop: 25}}
            onPress={() => props.navigation.goBack()}>
            <Icons name="chevron-left" size={20} style={style.backIcon} />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={style.title}>Reset Password</Text>
          </View>
        </View>
        <View style={style.content}>
          <ScrollView>
            <View style={{alignItems: 'center', paddingHorizontal: 40}}>
              <Image source={Reset} style={style.images} />
              <Text style={style.textSignup}>
                Enter the phone number to generate your verification code for
                example 082184+++
              </Text>
            </View>
            <View style={style.input}>
              <CustomInputText
                form={FormResetPass}
                name="verification_code"
                keyboardType="numeric"
                placeholder="verification code"
                containerStyle={style.inputContainer}
                inputStyle={style.textInput}
                inputContainerStyle={{borderColor: '#f2f4f5'}}
                leftIcon={<Icons name="user-check" size={16} color="#b8b8b8" />}
                rightIcon={
                  FormResetPass.errors.verification_code ? (
                    <Icons size={15} color={'grey'} />
                  ) : (
                    <Icons name="check-circle" size={15} color={'#1d57b6'} />
                  )
                }
              />
              <CustomInputText
                form={FormResetPass}
                name="new_password"
                secureTextEntry={hidePassword ? true : false}
                placeholder="new password"
                containerStyle={style.inputContainer}
                inputStyle={style.textInput}
                inputContainerStyle={{borderColor: '#f2f4f5'}}
                leftIcon={<Icons name="unlock-alt" size={16} color="#b8b8b8" />}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setHidePassword(!hidePassword)}>
                    <Icons
                      name={hidePassword ? 'eye-slash' : 'eye'}
                      size={15}
                      color="#b8b8b8"
                    />
                  </TouchableOpacity>
                }
              />
              <Input
                form={FormResetPass}
                name="confirm_password"
                secureTextEntry={hidePassword ? true : false}
                placeholder="confirm password"
                containerStyle={style.inputContainer}
                inputStyle={style.textInput}
                inputContainerStyle={{borderColor: '#f2f4f5'}}
                leftIcon={<Icons name="unlock-alt" size={16} color="#b8b8b8" />}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setHidePassword(!hidePassword)}>
                    <Icons
                      name={hidePassword ? 'eye-slash' : 'eye'}
                      size={15}
                      color="#b8b8b8"
                    />
                  </TouchableOpacity>
                }
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Button
                title="Reset"
                buttonStyle={style.button}
                onPress={() => setHideVisible(true)}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
export default ResetPassword;

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
    marginTop: 20,
    flex: 10,
  },
  images: {
    width: 170,
    height: 170,
  },
  input: {
    marginTop: 25,
    alignItems: 'center',
  },
  inputContainer: {
    width: 280,
  },
  textInput: {
    fontSize: 14,
    marginLeft: 20,
    color: '#707070',
  },
  button: {
    backgroundColor: '#1d57b6',
    width: 160,
    borderRadius: 40,
    marginTop: 20,
  },
  textLink: {
    color: '#1f58b6',
    textAlign: 'right',
    fontSize: 13,
    marginTop: 15,
    marginRight: 50,
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
    color: '#c9ced8',
    marginRight: 5,
    textAlign: 'center',
  },
  backIcon: {
    color: '#4f4f4f',
    marginLeft: 15,
    width: 20,
  },
  containOtherLog: {
    flexDirection: 'row',
    textAlign: 'center',
    alignSelf: 'center',
  },
});
