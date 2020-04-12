import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import friends from './Components/ListContact';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {db} from '../../Config/Firebase';
import {useSelector} from 'react-redux';
import user from '../../Helper/Image/users.png';

function ChatTop(props) {
  const [isOnline, setIsOnline] = React.useState(false);
  const [userOnline, setUserOnline] = React.useState([]);
  const {dataUser} = useSelector(state => state.userData);
  const dataOnline = Object.keys(userOnline).map(key => ({
    ...userOnline[key],
    key: key,
  }));

  React.useEffect(() => {
    db.ref(`user-data/${dataUser.uid}/friends/`)
      .orderByChild('status')
      .startAt('online')
      .endAt('online')
      .on('value', function(res) {
        if (res) {
          let data = res.val();
          if (data === null) {
            setIsOnline(false);
          } else {
            setIsOnline(true);
            const keys = Object.keys(data);
            const values = Object.values(data);
            for (let i = 0; i < keys.length; i++) {
              setUserOnline(prevState => ({
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
      <View
        style={{
          backgroundColor: '#ebeaee',
          height: 30,
          marginTop: isOnline ? 14 : -50,
          flex: 1,
          paddingHorizontal: 15,
        }}>
        <View style={style.methodCard}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {dataOnline &&
              dataOnline.map((v, i) => (
                <TouchableOpacity key={i}>
                  <View>
                    <Image
                      source={
                        (v.picture && {
                          uri: v.picture,
                        }) ||
                        user
                      }
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 26,
                        marginHorizontal: 7,
                      }}
                      PlaceholderContent={<ActivityIndicator />}
                    />
                    <Text
                      style={{
                        fontSize: 11,
                        marginTop: 3,
                        textAlign: 'center',
                        color: '#3b3b3c',
                      }}>
                      {v.email && v.email.substring(0, 6)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

export default ChatTop;

const style = StyleSheet.create({
  methodCard: {
    height: 10,
    flex: 1,
    paddingHorizontal: 20,
  },
});
