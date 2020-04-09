import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar, ListItem, Button} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import ChatTop from './ChatTop';
import ListChat from './Components/ListChat';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings([
  'Setting a timer for a long period of time',
  'Warning: Failed child context type: Invalid child context',
  `Warning: Can't perform a React state update `,
]);

function ChatList(props) {
  return (
    <>
      {console.log(ListChat)}
      <ChatTop />
      <View style={style.container}>
        <FlatList
          style={{marginTop: 20, paddingHorizontal: 15}}
          keyExtractor={(item, index) => index}
          data={ListChat}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('ChatID', {
                  name: item.name,
                  image: item.image,
                  date: item.date,
                })
              }>
              <ListItem
                title={item.name}
                titleStyle={style.nameUser}
                subtitle={
                  <View>
                    <Text style={style.message}>
                      {item.msg.substring(0, 80)} .....
                    </Text>
                    <Text style={style.date}>{item.date}</Text>
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
        <View style={style.containerSearch}>
          <Button
            buttonStyle={style.button}
            titleStyle={{fontSize: 12, marginLeft: 10}}
            title="Search"
            icon={<Icons name="search" size={12} color="white" />}
          />
        </View>
      </View>
    </>
  );
}

export default ChatList;

const style = StyleSheet.create({
  container: {
    borderRadius: 50,
    backgroundColor: 'white',
    flex: 4,
    marginTop: -30,
    marginBottom: -50,
    paddingBottom: 70,
  },
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
  date: {
    fontSize: 12,
    color: '#bababa',
    position: 'absolute',
    right: 0,
    marginTop: -15,
  },
  containerSearch: {
    paddingHorizontal: 80,
    position: 'absolute',
    bottom: 0,
    marginBottom: 80,
    alignSelf: 'center',
  },
  button: {
    width: 100,
    backgroundColor: '#1e57b5',
    borderRadius: 20,
  },
});
