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
import User from '../../Helper/Image/user3.jpg';
import Header from './Components/Header';
import {ScrollView} from 'react-native-gesture-handler';
import chatsPartner from './Components/PartnerChat';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: Each child in a list should']);

function ChatID(props) {
  return (
    <>
      <Header />
      <View style={style.container}>
        <View style={style.chatContainer}>
          <ScrollView>
            {chatsPartner.map((v, i) => (
              <View style={style.chatList}>
                <TouchableOpacity
                  key={i}
                  style={{height: 50, marginTop: 0, marginRight: 10}}>
                  <Image source={v.image} style={style.friendsImage} />
                </TouchableOpacity>
                <View style={{marginTop: -20}}>
                  <Text style={style.friendsDate}>{v.date}</Text>

                  {v.chat.map((v, i) => (
                    <>
                      <Text style={style.friendsMsg}>{v.msg}</Text>
                    </>
                  ))}
                </View>
              </View>
            ))}

            <View style={style.chatSenderList}>
              <View style={{marginTop: -20, marginLeft: 30}}>
                <Text style={style.senderDate}>Sunday, 13:15</Text>
                <Text style={style.senderMsg}>
                  Hello im a studdent in politechnic palembang and mayor is
                  nurse
                </Text>
              </View>
              <TouchableOpacity style={{height: 50}}>
                <Image source={User} style={style.senderImage} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={style.containerMsg}>
        <Input
          placeholder="Type message ..."
          inputStyle={{fontSize: 14}}
          inputContainerStyle={{borderBottomWidth: 0}}
        />
        <TouchableOpacity
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
    paddingTop: 25,
    paddingLeft: 20,
  },
  chatList: {
    flexDirection: 'row',
    marginTop: 17,
    paddingRight: 40,
  },
  chatSenderList: {
    flexDirection: 'row',
    marginTop: 25,
    paddingRight: 25,
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
    marginTop: 20,
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
  },
  senderImage: {
    width: 40,
    height: 40,
    borderRadius: 17,
    marginHorizontal: 7,
    marginLeft: -35,
  },
  senderDate: {
    fontSize: 11,
    color: '#bdbdbd',
    marginBottom: 5,
    textAlign: 'right',
    paddingRight: 50,
  },
  senderMsg: {
    backgroundColor: '#1e57b6',
    color: 'white',
    padding: 5,
    fontSize: 13,
    paddingHorizontal: 14,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 50,
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
});
