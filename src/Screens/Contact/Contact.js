import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import Data from './Component/Data';
import {db} from '../../Config/Firebase';
import {useSelector, useDispatch} from 'react-redux';
import user from '../../Helper/Image/users.png';

function Contact(props) {
  const {dataUser} = useSelector(state => state.userData);
  const [contact, setContact] = React.useState([]);

  const dataContact = Object.keys(contact).map(key => ({
    ...contact[key],
    key: key,
  }));
  console.log('contact', dataContact);

  React.useEffect(() => {
    let get = db.ref(`user-data/${dataUser.uid}/friends`);
    get.on('value', res => {
      console.log('contact', res);
      let data = res.val();
      const keys = Object.keys(data);
      const values = Object.values(data);
      console.log(data);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] !== dataUser.uid) {
          setContact(prevState => ({
            ...prevState,
            [keys[i]]: values[i],
          }));
        } else {
        }
      }
    });
  }, []);

  return (
    <>
      <View
        style={{
          borderRadius: 20,
          backgroundColor: '#ebeaee',
          flex: 1,
          marginBottom: -50,
          marginTop: -20,
        }}>
        <View style={{flex: 1, paddingHorizontal: 30, marginBottom: 50}}>
          <SearchBar
            placeholder="Type Here..."
            // onChangeText={this.updateSearch}
            // value={search}
            containerStyle={style.seacrhContainer}
            inputContainerStyle={style.seacrhInput}
            inputStyle={{fontSize: 14}}
          />
          <Text
            style={{
              marginLeft: 20,
              marginTop: 5,
              fontWeight: 'bold',
              color: '#5c5b5b',
              textAlign: 'right',
            }}>
            Friends {Object.keys(contact).length}
          </Text>
        </View>
        <View style={{marginTop: 20, flex: 10}}>
          <FlatList
            style={{paddingHorizontal: 20}}
            keyExtractor={(item, index) => index}
            data={dataContact}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('ChatID', {
                    name: item.fullname,
                    picture: item.picture,
                    email: item.email,
                    id: item.key,
                  })
                }>
                <ListItem
                  containerStyle={{backgroundColor: '#ebeaee'}}
                  title={item.fullname || item.email.substring(0, 6)}
                  titleStyle={style.nameUser}
                  subtitle={
                    <View>
                      <Text style={style.status}>
                        {item.information && item.information.substring(0, 20)}
                      </Text>
                    </View>
                  }
                  bottomDivider
                  leftAvatar={{
                    source: item.picture === '' ? user : {uri: item.picture},
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </>
  );
}

export default Contact;
const style = StyleSheet.create({
  nameUser: {
    fontWeight: 'bold',
    color: '#5b5b5b',
    fontSize: 14,
  },
  message: {
    fontSize: 12,
    color: '#bababa',
    marginTop: 5,
    marginRight: 17,
  },
  status: {
    fontSize: 12,
    color: '#bababa',
  },
  seacrhContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderWidth: 0,
  },
  seacrhInput: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 25,
    height: 50,
  },
});
