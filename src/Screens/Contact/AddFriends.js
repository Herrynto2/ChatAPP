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
import user from '../../Helper/Image/users.png';
import Empty from '../../Helper/Image/notfound.jpg';
import Loader from '../../Components/Loader';
import {db} from '../../Config/Firebase';
import {useSelector, useDispatch} from 'react-redux';

function AddFriends(props) {
  const [isAvailable, setIsAvailable] = React.useState(false);
  const [textMessage, setMessage] = React.useState('');
  const [dataSearch, setDataSearch] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const {dataUser} = useSelector(state => state.userData);

  const handleSearch = async () => {
    if (textMessage.length > 0) {
      setLoading(true);
      try {
        const search = await db
          .ref('user-data/')
          .orderByChild('email')
          .startAt(textMessage)
          .endAt(textMessage)
          .on('value', function(res) {
            if (res) {
              let data = res.val();
              if (data === null) {
                setDataSearch([]);
              } else if (Object.keys(data)[0] === dataUser.uid) {
                setDataSearch([]);
              } else {
                const dataUsers = Object.keys(data).map(key => ({
                  ...data[key],
                  key: key,
                }));
                db.ref(`user-data/${dataUser.uid}/friends/`)
                  .orderByChild('email')
                  .startAt(dataUsers[0].email)
                  .endAt(dataUsers[0].email)
                  .on('value', res => {
                    if (res) {
                      let datas = res.val();
                      if (datas === null) {
                        setIsAvailable(false);
                      } else {
                        setIsAvailable(true);
                      }
                    }
                  });
                setDataSearch(dataUsers);
              }
            } else {
            }
          });
      } catch (error) {}
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const data = {
        id: dataSearch[0].key,
        fullname: dataSearch[0].fullname || '',
        email: dataSearch[0].email,
        picture: dataSearch[0].picture || '',
        information: dataSearch[0].information || '',
      };
      const add = await db
        .ref('user-data')
        .child(dataUser.uid)
        .child('friends')
        .push(data);
    } catch (error) {}
  };

  return (
    <>
      <View style={{backgroundColor: '#1e58b5', height: 70}}>
        {loading && <Loader loading={loading} setLoading={setLoading} />}
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
            value={textMessage}
            onChangeText={textMessage => setMessage(textMessage)}
            containerStyle={style.seacrhContainer}
            inputContainerStyle={style.seacrhInput}
            inputStyle={{fontSize: 14}}
          />

          <Button
            onPress={handleSearch}
            icon={<Icons name="search" size={16} color="white" />}
            buttonStyle={{
              ...style.anotherLogin,
              backgroundColor: '#1e58b5',
            }}
          />

          {dataSearch.length === 1 && (
            <View style={style.dataContainer}>
              <View style={{alignSelf: 'center'}}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('FriendsProfile', {
                      name: dataSearch[0].fullname,
                      picture: dataSearch[0].picture,
                      email: dataSearch[0].email,
                      id: dataSearch[0].key,
                      info: dataSearch[0].information,
                    })
                  }
                  disabled={!isAvailable ? true : false}>
                  <Image
                    source={
                      (dataSearch[0].picture && {
                        uri: dataSearch[0].picture,
                      }) ||
                      user
                    }
                    style={{width: 100, height: 100, borderRadius: 100}}
                  />
                </TouchableOpacity>
                {!isAvailable && (
                  <TouchableOpacity
                    style={{marginTop: -45, marginLeft: 60}}
                    onPress={handleAdd}>
                    <Icon
                      reverse
                      name="ios-add"
                      type="ionicon"
                      color="grey"
                      size={15}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <Text style={style.name}>
                {dataSearch[0].fullname ||
                  (dataSearch[0].email && dataSearch[0].email.substring(0, 5))}
              </Text>
            </View>
          )}

          {dataSearch.length === 0 && (
            <View style={style.emptyContainer}>
              <Text style={{fontSize: 17, color: 'grey'}}>
                There is no data
              </Text>
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
  emptyContainer: {
    alignSelf: 'center',
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  dataContainer: {
    alignSelf: 'center',
    marginBottom: 40,
    marginTop: 30,
  },
});
