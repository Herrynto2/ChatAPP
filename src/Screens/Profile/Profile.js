import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import user from '../../Helper/Image/user3.jpg';
import CustomInputText from '../../Components/CustomInputText';
import CustomAlert from '../../Components/CustomAlert';
import {updateProfile} from '../../Redux/Actions/userDataAction';
import {useSelector, useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Loader from '../../Components/Loader';
import ImagePicker from 'react-native-image-picker';

function Profile(props) {
  const [srcImageUpdate, setSrcImageUpdate] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const {dataProfile} = useSelector(state => state.userData);

  const FormUpdateUser = useFormik({
    enableReinitialize: true,
    initialValues: {...dataProfile} || {},
    validationSchema: Yup.object({
      fullname: Yup.string().nullable(),
      email: Yup.string()
        .email()
        .nullable(),
      information: Yup.string().nullable(),
      picture: Yup.mixed().nullable(),
    }),
    onSubmit: async (values, form) => {
      setLoading(true);
      try {
        const formData = new FormData();
        const fillAble = ['fullname', 'email', 'information', 'picture'];
        fillAble
          .filter(
            keyUpdate =>
              values[keyUpdate] && values[keyUpdate] !== dataProfile[keyUpdate],
          )
          .forEach(keyUpdate => {
            if (keyUpdate !== 'picture') {
              formData.append(keyUpdate, values[keyUpdate]);
            } else {
              formData.append('picture', {
                name: values.picture.fileName,
                type: values.picture.type,
                uri:
                  Platform.OS === 'android'
                    ? values.picture.uri
                    : values.picture.uri.replace('file://', ''),
              });
            }
          });
        // const response = await patchData('profile', formData);
        // if (response.data && response.data.success) {
        //   await dispatch(updateProfile());
        //   CustomAlert(response.data.success, response.data.msg);
        // } else {
        //   CustomAlert(response.data.success, response.data.msg);
        // }
      } catch (err) {
        console.log(err);
        // if (!(err.message === 'Network Error')) {
        //   if (err.response) {
        //     CustomAlert(err.response.data.success, err.response.data.msg);
        //   }
        // }
      }
      setLoading(false);
    },
  });

  const handleChangePicture = () => {
    const options = {
      noData: true,
      quality: 0.6,
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        console.log(response);
        setSrcImageUpdate(response.uri);
        FormUpdateUser.setFieldValue('picture', response);
      }
    });
  };

  return (
    <>
      <View style={{backgroundColor: '#1e58b5', height: 70}}>
        <TouchableOpacity
          style={{width: 50, marginTop: 35}}
          onPress={() => props.navigation.goBack()}>
          <Icons name="chevron-left" size={20} style={style.backIcon} />
        </TouchableOpacity>
        <Text style={style.titleHeader}>Profile</Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}>
        <View style={style.container}>
          <View style={{alignSelf: 'center', marginBottom: 40}}>
            <Image
              source={user}
              style={{width: 160, height: 160, borderRadius: 100}}
            />
            <TouchableOpacity
              style={{marginTop: -55, marginLeft: 100}}
              onPress={handleChangePicture}>
              <Icon
                reverse
                name="ios-camera"
                type="ionicon"
                color="grey"
                size={18}
              />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View style={{alignSelf: 'center'}}>
              <CustomInputText
                form={FormUpdateUser}
                name="fullname"
                placeholder="Name"
                containerStyle={style.inputContainer}
                inputStyle={style.textInput}
                inputContainerStyle={{borderColor: '#f2f4f5'}}
                leftIcon={<Icons name="user" size={16} color="#b8b8b8" />}
              />
              <CustomInputText
                form={FormUpdateUser}
                name="email"
                placeholder="Email"
                containerStyle={style.inputContainer}
                inputStyle={style.textInput}
                inputContainerStyle={{borderColor: '#f2f4f5'}}
                leftIcon={<Icons name="envelope" size={16} color="#b8b8b8" />}
              />
              <CustomInputText
                form={FormUpdateUser}
                name="information"
                placeholder="Information"
                containerStyle={style.inputContainer}
                inputStyle={style.textInput}
                inputContainerStyle={{borderColor: '#f2f4f5'}}
                leftIcon={<Icons name="info" size={16} color="#b8b8b8" />}
              />
              <View style={{alignItems: 'center'}}>
                <Button
                  title="Edit"
                  buttonStyle={style.button}
                  onPress={FormUpdateUser.handleSubmit}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

export default Profile;

const style = StyleSheet.create({
  container: {
    flex: 8,
    alignSelf: 'center',
    paddingTop: 40,
  },
  backIcon: {
    color: '#bfd8ff',
    marginLeft: 20,
    width: 20,
    marginTop: -10,
  },
  textInput: {
    fontSize: 14,
    marginLeft: 20,
    color: '#707070',
  },
  inputContainer: {
    width: 270,
  },
  button: {
    backgroundColor: '#1d57b6',
    width: 160,
    borderRadius: 20,
    marginTop: 130,
  },
  titleHeader: {
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: -24,
    fontWeight: 'bold',
    color: 'white',
    width: 100,
  },
});
