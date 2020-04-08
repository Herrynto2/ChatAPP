import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {Image, Input, Button, Icon} from 'react-native-elements';
import CheckImg from '../../Helper/Image/check.jpg';
import CustomAlert from '../../Components/CustomAlert';
import CustomInputText from '../../Components/CustomInputText';
import * as Yup from 'yup';
import Loader from '../../Components/Loader';
import {useFormik} from 'formik';
import Icons from 'react-native-vector-icons/FontAwesome5';

function CheckContact(props) {
  const [hidePassword, setHidePassword] = React.useState(true);
  const FormCheckPass = useFormik({
    initialValues: {phone_number: ''},
    validationSchema: Yup.object({
      phone_number: Yup.string()
        .required('phone number is Required')
        .min(10, 'Phone number Must have min 10 character'),
    }),
    onSubmit: async (values, form) => {
      setLoading(true);
      try {
        // const response = await dispatch(userLogin(values));
        // if (response.data && !response.data.success) {
        CustomAlert(true, 'Login success');
        // }
        console.log('message');
      } catch (err) {
        // setLoading(false);
        // console.log('er', err);
        // if (!(err.message === 'Network Error')) {
        //   if (err.response) {
        //     CustomAlert(err.response.data.success, err.response.data.msg);
        //   }
        // }
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
            <Text style={style.title}>Forgot Password</Text>
          </View>
        </View>
        <View style={style.content}>
          <ScrollView>
            <View style={{alignItems: 'center', paddingHorizontal: 40}}>
              <Image source={CheckImg} style={style.images} />
              <Text style={style.textSignup}>
                Enter the phone number to generate your verification code for
                example 082184+++
              </Text>
            </View>
            <View style={style.input}>
              <CustomInputText
                form={FormCheckPass}
                name="phone_number"
                keyboardType="numeric"
                placeholder="phone number"
                containerStyle={style.inputContainer}
                inputStyle={style.textInput}
                inputContainerStyle={{borderColor: '#f2f4f5'}}
                leftIcon={<Icons name="phone" size={16} color="#b8b8b8" />}
                rightIcon={
                  FormCheckPass.errors.phone_number ? (
                    <Icons size={15} color={'grey'} />
                  ) : (
                    <Icons name="check-circle" size={15} color={'#1d57b6'} />
                  )
                }
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Button
                title="Check Now"
                buttonStyle={style.button}
                onPress={() => props.navigation.navigate('ResetPassword')}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
export default CheckContact;

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
    width: 220,
    height: 220,
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
