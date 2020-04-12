import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Icon, Button, SearchBar} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import user from '../../Helper/Image/users.png';
import OverlayPicture from '../../Components/OverlayPicture';
import {db} from '../../Config/Firebase';
import {useSelector} from 'react-redux';

function FriendsProfile(props) {
  const [isVisible, setHideVisible] = React.useState(false);

  const {dataUser} = useSelector(state => state.userData);
  console.log(props.route.params.id);
  const handleAddToChat = async () => {
    try {
      props.navigation.navigate('ChatID', {
        name: props.route.params.name,
        picture: props.route.params.picture,
        email: props.route.params.email,
        id: props.route.params.id,
      });
      const chat = {
        id: props.route.params.id,
        fullname: props.route.params.name || '',
        email: props.route.params.email,
        picture: props.route.params.picture || '',
        newmessage: '',
      };
      await db
        .ref(`list-chat/${dataUser.uid}/friends/`)
        .orderByChild('email')
        .startAt(props.route.params.email)
        .endAt(props.route.params.email)
        .on('value', res => {
          if (res) {
            let datas = res.val();
            if (datas !== null) {
              return;
            } else {
              db.ref(`list-chat/${dataUser.uid}`)
                .child('friends')
                .push(chat)
                .then(response => console.log('res', response))
                .catch(error => {
                  console.log('err', error);
                });
              return;
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={{backgroundColor: '#1e58b5', height: 70}}>
        {isVisible && (
          <OverlayPicture
            picture={props.route.params.picture}
            isVisible={isVisible}
            setHideVisible={setHideVisible}
          />
        )}
        <TouchableOpacity
          style={{width: 50, marginTop: 35}}
          onPress={() => props.navigation.goBack()}>
          <Icons name="chevron-left" size={20} style={style.backIcon} />
        </TouchableOpacity>
        <Text style={style.titleHeader}>Friends</Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}>
        <View style={style.container}>
          <View style={style.imgContainer}>
            <TouchableOpacity onPress={() => setHideVisible(true)}>
              <Image
                source={
                  (props.route.params.picture && {
                    uri: props.route.params.picture,
                  }) ||
                  user
                }
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Text
                style={{
                  color: 'white',
                  backgroundColor: '#1e58b5',
                  fontSize: 20,
                  padding: 5,
                  paddingHorizontal: 20,
                  borderRadius: 15,
                  marginBottom: 10,
                }}>
                {props.route.params.name
                  ? props.route.params.name
                  : props.route.params.email.substring(0, 6)}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Icons
                  name="envelope"
                  size={16}
                  color="#b8b8b8"
                  style={{marginTop: 7, marginRight: 10}}
                />
                <Text
                  style={{
                    color: '#929292',
                    fontSize: 15,
                    marginTop: 5,
                    marginBottom: 5,
                  }}>
                  {props.route.params.email}
                </Text>
              </View>

              <Text style={{color: '#929292'}}>{props.route.params.info}</Text>
            </View>
            <TouchableOpacity
              style={{
                width: 50,
                marginTop: -170,
                marginLeft: 160,
                marginBottom: 10,
              }}
              onPress={handleAddToChat}>
              <Icons
                name="comment"
                size={20}
                color="white"
                style={{
                  backgroundColor: '#1e58b5',
                  padding: 10,
                  alignSelf: 'center',
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

export default FriendsProfile;

const style = StyleSheet.create({
  confirm: {
    marginTop: 40,
    width: '15%',
    height: '27%',
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: 'transparent',
    elevation: 4,
    paddingTop: 12,
  },
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
    paddingRight: 20,
  },
  name: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
    fontWeight: 'bold',
    backgroundColor: '#888888',
    borderRadius: 10,
    paddingHorizontal: 10,
    padding: 2,
  },
  anotherLogin: {
    borderRadius: 100,
    width: 50,
    height: 50,
    position: 'absolute',
    right: 0,
    marginTop: -58,
    marginHorizontal: 8,
  },
  imgContainer: {
    alignSelf: 'center',
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
