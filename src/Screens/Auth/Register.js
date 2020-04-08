import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {Image, Input, Button, Icon} from 'react-native-elements';
import CustomAlert from '../../Components/CustomAlert';
import CustomInputText from '../../Components/CustomInputText';
import * as Yup from 'yup';
import Loader from '../../Components/Loader';
import {useFormik} from 'formik';
import Icons from 'react-native-vector-icons/FontAwesome5';

function Register(props) {
  const [hidePassword, setHidePassword] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const FormRegister = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      phone_number: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, 'Username Must have More Than 6 character')
        .required('Username Is Required'),
      password: Yup.string()
        .min(8, 'Password Must have More Than 8 Character')
        .required('Passoword Is Required'),
      email: Yup.string()
        .email('Enter Valid Valid Email')
        .required('Email is Required'),
      phone_number: Yup.number()
        .required('Required phone number')
        .min(10, 'Phone number Must have min 10 character'),
    }),
    onSubmit: async (values, form) => {
      setLoading(true);
      props.navigation.navigate('Verify');
      setLoading(false);
    },
  });

  return (
    <>
      <View style={style.container}>
        {loading && <Loader loading={loading} setLoading={setLoading} />}
        <View style={{flex: 1, paddingBottom: 20, marginBottom: 20}}>
          <TouchableOpacity
            style={{width: 50, marginTop: 25}}
            onPress={() => props.navigation.goBack()}>
            <Icons name="chevron-left" size={20} style={style.backIcon} />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={style.title}>Sign Up</Text>
          </View>
        </View>
        <View style={style.content}>
          <ScrollView>
            <View style={style.input}>
              <CustomInputText
                form={FormRegister}
                name="username"
                placeholder="username"
                containerStyle={style.inputContainer}
                inputStyle={style.textInput}
                inputContainerStyle={{borderColor: '#f2f4f5'}}
                leftIcon={<Icons name="user" size={16} color="#b8b8b8" />}
                rightIcon={
                  FormRegister.errors.username ? (
                    <Icons size={15} color={'grey'} />
                  ) : (
                    <Icons name="check-circle" size={15} color={'#1d57b6'} />
                  )
                }
              />
              <CustomInputText
                form={FormRegister}
                name="password"
                secureTextEntry={hidePassword ? true : false}
                placeholder="password"
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
              <CustomInputText
                form={FormRegister}
                name="phone_number"
                keyboardType="numeric"
                placeholder="phone number"
                containerStyle={style.inputContainer}
                inputStyle={style.textInput}
                inputContainerStyle={{borderColor: '#f2f4f5'}}
                leftIcon={<Icons name="phone" size={16} color="#b8b8b8" />}
                rightIcon={
                  FormRegister.errors.phone_number ? (
                    <Icons size={15} color={'grey'} />
                  ) : (
                    <Icons name="check-circle" size={15} color={'#1d57b6'} />
                  )
                }
              />
              <CustomInputText
                placeholder="Email"
                form={FormRegister}
                name="email"
                containerStyle={style.inputContainer}
                inputStyle={style.textInput}
                inputContainerStyle={{borderColor: '#f2f4f5'}}
                leftIcon={<Icons name="envelope" size={16} color="#b8b8b8" />}
                rightIcon={
                  FormRegister.errors.email ? (
                    <Icons size={15} color={'grey'} />
                  ) : (
                    <Icons name="check-circle" size={15} color={'#1d57b6'} />
                  )
                }
              />
              <View style={{alignItems: 'center'}}>
                <Button
                  title="Sign Up"
                  buttonStyle={style.button}
                  // onPress={() => FormRegister.handleSubmit()}
                  onPress={() => props.navigation.navigate('Verify')}
                />
              </View>
            </View>

            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Text style={style.textSignup}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Login')}>
                <Text style={{...style.textSignup, color: '#393939'}}>
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
export default Register;

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
    paddingTop: 0,
  },
  images: {
    width: 220,
    height: 220,
  },
  input: {
    marginTop: 25,
    alignItems: 'center',
  },
  inputContainer: {
    width: 280,
    marginBottom: 10,
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
  },
  anotherLogin: {
    borderRadius: 100,
    width: 35,
    marginTop: 20,
    marginHorizontal: 8,
  },
  textSignup: {
    marginTop: 180,
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
});
