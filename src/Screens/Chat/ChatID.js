import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Input} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import User from '../../Helper/Image/users.png';
import Header from './Components/Header';
import {ScrollView} from 'react-native-gesture-handler';
import chatsPartner from './Components/PartnerChat';
import {YellowBox} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {db} from '../../Config/Firebase';
import {DatePickerAndroid} from 'react-native';
import {chatList} from '../../Redux/Actions/userDataAction';
import OverlayPicture from '../../Components/OverlayPicture';

YellowBox.ignoreWarnings(['Warning: Each child in a list should']);

function ChatID(props) {
  const [isVisible, setHideVisible] = React.useState(false);
  const [keys, setKeys] = React.useState('');
  const [isAvailbale, setIsAvailable] = React.useState(false);
  const [textMessage, setMessage] = React.useState('');
  const [messageList, setMessageList] = React.useState([]);
  const {dataUser} = useSelector(state => state.userData);
  const {dataChat} = useSelector(state => state.userChat);
  const messageListArr = Object.keys(messageList).map(key => ({
    ...messageList[key],
    key: key,
  }));
  const dispatch = useDispatch();

  React.useEffect(() => {
    const gets = db
      .ref('chat-room')
      .child(dataUser.uid)
      .on('value', res => {});

    const get = db
      .ref('chat-room')
      .child(dataUser.uid)
      .child(props.route.params.id)
      .on('value', value => {
        if (value) {
          let data = value.val();
          if (data === null) {
            console.log('err');
          } else {
            const keys = Object.keys(data);
            const values = Object.values(data);
            for (let i = 0; i < keys.length; i++) {
              setMessageList(prevState => ({
                ...prevState,
                [keys[i]]: values[i],
              }));
            }
          }
        } else {
          console.log('error');
        }
      });
  }, []);

  const sendMessage = async () => {
    if (textMessage.length > 0) {
      try {
        let msg = {
          to: props.route.params.name,
          msg: textMessage,
          time: new Date().getHours() + '.' + new Date().getMinutes(),
          id: dataUser.uid,
        };
        const msgID = await db
          .ref('chat-room')
          .child(dataUser.uid)
          .child(props.route.params.id)
          .push(msg);
        setMessage('');
        const msgIDReceiv = await db
          .ref('chat-room')
          .child(props.route.params.id)
          .child(dataUser.uid)
          .push(msg);
        //  if(msgReceiv) {

        //  }
        // const msgUpdateFriends = await db
        //   .ref(`list-chat/${props.route.params.id}/friends/`)
        //   .orderByChild('id')
        //   .startAt(dataUser.uid)
        //   .on('value', response => {
        //     console.log('response', response);
        //     if (response) {
        //       let datas = response.val();
        //       if (datas === null) {
        //         console.log('null');
        //         return;
        //       } else {
        //         const key = Object.keys(datas);
        //         console.log('key', key[0]);
        //         db.ref(
        //           `list-chat/${props.route.params.id}/friends/${key}`,
        //         ).update({
        //           newmessage: textMessage,
        //         });
        //         return;
        //       }
        //     }
        //   });

        if (msgID) {
          const msgUpdateUser = await db
            .ref(`list-chat/${dataUser.uid}/friends/`)
            .orderByChild('id')
            .startAt(props.route.params.id)
            .on('value', res => {
              if (res) {
                console.log('res', res);
                let data = res.val();
                setIsAvailable(true);
                const keys = Object.keys(data);
                const update = db
                  .ref(`list-chat/${dataUser.uid}/friends/${keys[0]}`)
                  .update({
                    newmessage: textMessage,
                  });
                setKeys(keys[0]);
              } else {
                setIsAvailable(false);
              }
            });

          const get = db
            .ref('chat-room')
            .child(dataUser.uid)
            .child(props.route.params.id)
            .on('value', value => {
              let data = value.val();
              const keys = Object.keys(data);
              const values = Object.values(data);
              for (let i = 0; i < keys.length; i++) {
                setMessageList(prevState => ({
                  ...prevState,
                  [keys[i]]: values[i],
                }));
              }
              const messageListArr = Object.keys(messageList).map(key => ({
                ...messageList[key],
                key: key,
              }));
              // dispatch(chatList(messageListArr));
              setMessage('');
            });
        }
      } catch (error) {}
    }
  };

  return (
    <>
      <View style={style.containerHeader}>
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
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={{height: 50, marginTop: -38}}
            onPress={() => setHideVisible(true)}>
            <Image
              source={
                (props.route.params.picture && {
                  uri: props.route.params.picture,
                }) ||
                User
              }
              style={style.ImageUser}
              PlaceholderContent={<ActivityIndicator />}
            />
          </TouchableOpacity>
          <Text style={{color: '#bfd8ff', fontSize: 12, marginTop: 5}}>
            {props.route.params.name}
          </Text>
        </View>
      </View>
      <View style={style.container}>
        <View style={style.chatContainer}>
          <ScrollView>
            {messageListArr &&
              messageListArr.map((v, i) => (
                <View
                  style={{
                    ...style.chatList,
                    alignSelf:
                      dataUser.uid === v.id ? 'flex-end' : 'flex-start',
                  }}>
                  <TouchableOpacity
                    key={i}
                    style={{height: 50, marginTop: 0, marginRight: 10}}
                  />
                  <View style={{marginTop: -20}}>
                    <Text
                      style={
                        dataUser.uid === v.id
                          ? style.senderDate
                          : style.friendsDate
                      }>
                      {v.time}
                    </Text>
                    <Text
                      style={
                        dataUser.uid === v.id
                          ? style.senderMsg
                          : style.friendsMsg
                      }>
                      {v.msg}
                    </Text>

                    {/* </>
                  ))} */}
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
      <View style={style.containerMsg}>
        <Input
          placeholder="Type message ..."
          inputStyle={{fontSize: 14}}
          value={textMessage}
          onChangeText={textMessage => setMessage(textMessage)}
          inputContainerStyle={{borderBottomWidth: 0}}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{
            marginTop: 15,
            marginLeft: 10,
          }}>
          <Icons name="paper-plane" size={20} style={style.sendIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default ChatID;

const style = StyleSheet.create({
  containerHeader: {
    backgroundColor: '#1e57b6',
    height: 170,
    marginBottom: -50,
    marginTop: -20,
  },
  backIcon: {
    color: '#bfd8ff',
    marginLeft: 20,
    width: 20,
  },
  container: {
    flex: 1,
    marginTop: 100,
    marginBottom: 30,
    backgroundColor: '#ebeaef',
  },
  chatContainer: {
    flex: 6,
    borderRadius: 50,
    backgroundColor: '#f7f7f7',
    marginTop: -100,
    marginBottom: -30,
    paddingTop: 55,
    paddingLeft: 20,
  },
  chatList: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: -20,
    marginRight: -25,
  },
  chatSenderList: {
    flexDirection: 'row',
    marginTop: 30,
  },
  friendsImage: {
    width: 40,
    height: 40,
    marginTop: 15,
    borderRadius: 17,
    marginHorizontal: 7,
  },
  friendsDate: {
    fontSize: 11,
    marginTop: 5,
    marginBottom: -6,
    color: '#bdbdbd',
  },
  friendsMsg: {
    backgroundColor: '#eaeaea',
    color: '#595858',
    padding: 5,
    fontSize: 13,
    paddingHorizontal: 14,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginRight: 50,
    marginTop: 7,
    marginBottom: 30,
  },
  senderImage: {
    width: 40,
    height: 40,
    borderRadius: 17,
    marginHorizontal: 7,
    marginLeft: -35,
  },
  senderDate: {
    fontSize: 10,
    color: '#bdbdbd',
    textAlign: 'right',
    paddingRight: 50,
    position: 'absolute',
    left: 0,
    marginTop: 24,
    marginLeft: -32,
  },
  senderMsg: {
    backgroundColor: '#1e57b6',
    color: 'white',
    padding: 5,
    fontSize: 13,
    marginTop: 8,
    paddingHorizontal: 14,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 50,
    marginBottom: 30,
  },
  backIcon: {
    color: '#bfd8ff',
    marginLeft: 15,
    marginTop: 20,
    width: 20,
  },
  sendIcon: {
    color: '#a9a7b1',
    marginRight: 30,
  },
  title: {
    marginTop: -20,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#393939',
  },
  containerMsg: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    paddingRight: 60,
  },
  ImageUser: {
    width: 50,
    height: 50,
    borderRadius: 17,
    marginHorizontal: 7,
  },
});
