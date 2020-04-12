import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import ChatTop from './ChatTop';
import {db} from '../../Config/Firebase';
import {useSelector} from 'react-redux';
import user from '../../Helper/Image/users.png';
import {YellowBox} from 'react-native';
import Empty from '../../Helper/Image/nochat.jpg';

YellowBox.ignoreWarnings([
  'Setting a timer for a long period of time',
  'Warning: Failed child context type: Invalid child context',
  `Warning: Can't perform a React state update `,
]);

function ChatList(props) {
  const [isAvailable, setIsAvailable] = React.useState(false);
  const [listChat, setListChat] = React.useState([]);
  const {dataUser} = useSelector(state => state.userData);
  const dataChat = Object.keys(listChat).map(key => ({
    ...listChat[key],
    key: key,
  }));

  React.useEffect(() => {
    let get = db.ref(`list-chat/${dataUser.uid}/friends`);
    get.on('value', res => {
      if (res) {
        let data = res.val();
        if (data === null) {
          setIsAvailable(false);
        } else {
          setIsAvailable(true);
          const keys = Object.keys(data);
          const values = Object.values(data);
          for (let i = 0; i < keys.length; i++) {
            setListChat(prevState => ({
              ...prevState,
              [keys[i]]: values[i],
            }));
          }
        }
      }
    });
  }, []);

  return (
    <>
      <ChatTop />
      <View style={style.container}>
        {isAvailable && (
          <FlatList
            style={{marginTop: 20, paddingHorizontal: 15}}
            keyExtractor={(item, index) => index}
            data={dataChat}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('ChatID', {
                    id: item.id,
                    email: item.email,
                    name: item.fullname || item.email,
                    picture: item.picture,
                  })
                }>
                <ListItem
                  title={item.fullname}
                  titleStyle={style.nameUser}
                  subtitle={
                    <View>
                      <Text style={style.message}>
                        {item.newmessage
                          ? item.newmessage.substring(0, 80)
                          : '.....'}
                      </Text>
                      <Text style={style.date}>{item.date}</Text>
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
        )}
        {!isAvailable && (
          <View style={style.emptyContainer}>
            <Image source={Empty} style={style.emptyImg} />
          </View>
        )}
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
  emptyContainer: {
    alignSelf: 'center',
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyImg: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});
