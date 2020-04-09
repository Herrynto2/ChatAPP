import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {Image, Input, Button, Icon} from 'react-native-elements';
import Logins from '../../Helper/Image/login.jpg';
import Icons from 'react-native-vector-icons/FontAwesome5';
import CustomAlert from '../../Components/CustomAlert';
import CustomInputText from '../../Components/CustomInputText';
import * as Yup from 'yup';
import Loader from '../../Components/Loader';
import {useFormik} from 'formik';
import {auth} from '../../Config/Firebase';
import {userLogin} from '../../Redux/Actions/userDataAction';
import {useDispatch} from 'react-redux';

function Login(props) {
  const [hidePassword, setHidePassword] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const FormLogin = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Enter Valid Valid Email')
        .required('Email is Required'),
      password: Yup.string().required('Password is Required'),
    }),
    onSubmit: async (values, form) => {
      setLoading(true);
      try {
        await auth
          .signInWithEmailAndPassword(values.email, values.password)
          .then(response => {
            dispatch(userLogin(response));
            CustomAlert(true, 'Login success');
            form.setSubmitting(false);
            form.resetForm();
          })
          .catch(err => {
            CustomAlert(false, err.message);
          });
      } catch (err) {
        CustomAlert(false, err.message);
      }
      setLoading(false);
    },
  });

  return (
    <>
      <View style={style.container}>
        <View style={{flex: 1, paddingBottom: 30}}>
          <TouchableOpacity
            style={{width: 50, marginTop: 25}}
            onPress={() => props.navigation.goBack()}>
            <Icons name="chevron-left" size={20} style={style.backIcon} />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={style.title}>Log in</Text>
          </View>
        </View>
        <View style={style.content}>
          <ScrollView>
            <View style={{alignItems: 'center'}}>
              <Image source={Logins} style={style.images} />
            </View>
            <View style={style.input}>
              <CustomInputText
                form={FormLogin}
                name="email"
                placeholder="email"
                containerStyle={style.inputContainer}
                inputStyle={style.textInput}
                inputContainerStyle={{borderColor: '#f2f4f5'}}
                leftIcon={<Icons name="envelope" size={16} color="#b8b8b8" />}
                rightIcon={
                  FormLogin.errors.email ? (
                    <Icons size={15} color={'grey'} />
                  ) : (
                    <Icons name="check-circle" size={15} color={'#1d57b6'} />
                  )
                }
              />
              <CustomInputText
                form={FormLogin}
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
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('CheckContact')}>
              <View>
                <Text style={style.textLink}>Forgot Password</Text>
              </View>
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <Button
                title="Login"
                buttonStyle={style.button}
                onPress={FormLogin.handleSubmit}
              />
            </View>
            <Text style={style.textSignup}>Login Via</Text>
            <View style={style.containOtherLog}>
              <TouchableOpacity>
                <Button
                  icon={<Icons name="facebook-f" size={16} color="white" />}
                  buttonStyle={style.anotherLogin}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Button
                  icon={<Icons name="google" size={16} color="white" />}
                  onPress={() => setLoading(true)}
                  buttonStyle={{
                    ...style.anotherLogin,
                    backgroundColor: '#df4c4f',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <Text style={style.textSignup}>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Register')}>
                <Text style={{...style.textSignup, color: '#393939'}}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {loading && <Loader loading={loading} setLoading={setLoading} />}
      </View>
    </>
  );
}
export default Login;

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
  },
  images: {
    width: 200,
    height: 200,
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
  font: {
    fontSize: 20,
  },
  fonts: {
    fontSize: 11,
  },
});
