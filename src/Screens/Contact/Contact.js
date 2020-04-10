import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import Data from './Component/Data';
import {db} from '../../Config/Firebase';
import {useSelector, useDispatch} from 'react-redux';

function Contact(props) {
  const {dataProfile, dataUser} = useSelector(state => state.userData);
  const [contact, setContact] = React.useState([]);

  React.useEffect(() => {
    var obj = {a: {}, b: {}, c: {}};

    const get = db
      .ref(`user-data`)
      .once('value', data => {
        console.log(data);
      })

      .catch(err => {
        console.log(err);
      });
  });

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
            Friends 23
          </Text>
        </View>
        <View style={{marginTop: 20, flex: 10}}>
          <FlatList
            style={{paddingHorizontal: 20}}
            keyExtractor={(item, index) => index}
            data={Data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('ChatID', {
                    name: item.name,
                    image: item.image,
                  })
                }>
                <ListItem
                  containerStyle={{backgroundColor: '#ebeaee'}}
                  title={item.name}
                  titleStyle={style.nameUser}
                  subtitle={
                    <View>
                      {/* <Text style={style.message}>
                          {item.msg.substring(0, 80)} .....
                        </Text> */}
                      <Text style={style.status}>{item.status}</Text>
                    </View>
                  }
                  bottomDivider
                  leftAvatar={{
                    source: item.image,
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