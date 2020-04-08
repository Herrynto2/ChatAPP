import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {Image, Input, Button} from 'react-native-elements';
import VerifyImg from '../../Helper/Image/verify.jpg';
import Icons from 'react-native-vector-icons/FontAwesome5';
import CustomAlert from '../../Components/CustomAlert';
import CustomInputText from '../../Components/CustomInputText';
import * as Yup from 'yup';
import Loader from '../../Components/Loader';
import {useFormik} from 'formik';

function Verify(props) {
  const [loading, setLoading] = React.useState(false);

  const FormVerify = useFormik({
    initialValues: {
      verification_code: '',
    },
    validationSchema: Yup.object({
      verification_code: Yup.string()
        .length(6, 'Code Verify Only Have 6 Character')
        .required('Code Verify Is Required'),
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
        <View style={{flex: 1, paddingBottom: 30}}>
          <TouchableOpacity
            style={{width: 50, marginTop: 25}}
            onPress={() => props.navigation.goBack()}>
            <Icons name="chevron-left" size={20} style={style.backIcon} />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={style.title}>Verify</Text>
          </View>
        </View>
        <View style={style.content}>
          <ScrollView>
            <View style={{alignItems: 'center', paddingHorizontal: 40}}>
              <Image source={VerifyImg} style={style.images} />
              <Text style={style.textSignup}>
                Your verification code already send to +622184783116
              </Text>
            </View>
            <View>
              <CustomInputText
                keyboardType="numeric"
                form={FormVerify}
                name="verification_code"
                inputContainerStyle={style.input}
                inputStyle={style.inputText}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Button
                title="Verify"
                buttonStyle={style.button}
                onPress={() => props.navigation.navigate('Success')}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
export default Verify;

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
  input: {
    marginTop: 30,
    borderRadius: 25,
    borderBottomWidth: 0,
    backgroundColor: '#f0efef',
    width: 250,
    height: 60,
    alignSelf: 'center',
  },
  inputText: {
    fontSize: 25,
    textAlign: 'center',
    color: '#525252',
  },
});
