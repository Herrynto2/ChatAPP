import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {Icon, Button, SearchBar} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import user from '../../Helper/Image/user3.jpg';
import Empty from '../../Helper/Image/notfound.jpg';
import CustomInputText from '../../Components/CustomInputText';
import CustomAlert from '../../Components/CustomAlert';

function AddFriends(props) {
  const [isAvailable, setIsAvailable] = React.useState(false);

  return (
    <>
      <View style={{backgroundColor: '#1e58b5', height: 70}}>
        <TouchableOpacity
          style={{width: 50, marginTop: 35}}
          onPress={() => props.navigation.goBack()}>
          <Icons name="chevron-left" size={20} style={style.backIcon} />
        </TouchableOpacity>
        <Text style={style.titleHeader}>Search Person</Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}>
        <View style={style.container}>
          <SearchBar
            placeholder="Type Here..."
            containerStyle={style.seacrhContainer}
            inputContainerStyle={style.seacrhInput}
            inputStyle={{fontSize: 14}}
          />
          {isAvailable && (
            <View
              style={{
                alignSelf: 'center',
                marginBottom: 40,
                marginTop: 30,
              }}>
              <View style={{alignSelf: 'center'}}>
                <Image
                  source={user}
                  style={{width: 100, height: 100, borderRadius: 100}}
                />
                <TouchableOpacity style={{marginTop: -45, marginLeft: 60}}>
                  <Icon
                    reverse
                    name="ios-add"
                    type="ionicon"
                    color="grey"
                    size={15}
                  />
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  marginTop: 10,
                  fontWeight: 'bold',
                  backgroundColor: '#888888',
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  padding: 2,
                }}>
                Michael Jordan
              </Text>
            </View>
          )}

          {!isAvailable && (
            <View
              style={{
                alignSelf: 'center',
                marginBottom: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Text style={{fontSize: 20}}>Data is not found</Text>
              <Image
                source={Empty}
                style={{
                  width: 280,
                  height: 280,
                  borderRadius: 100,
                }}
              />
            </View>
          )}

          {/* <View style={{alignSelf: 'center'}}>
            <View style={{alignItems: 'center'}}>
              <Button title="Edit" buttonStyle={style.button} />
            </View>
          </View> */}
        </View>
      </View>
    </>
  );
}

export default AddFriends;

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
    width: 150,
  },
  seacrhContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderWidth: 0,
  },
  seacrhInput: {
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 20,
    marginTop: -20,
    height: 50,
    width: 270,
  },
});
