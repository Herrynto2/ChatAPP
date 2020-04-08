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

function ChatTop(props) {
  return (
    <>
      {console.log(friends[0])}
      <View
        style={{
          backgroundColor: '#ebeaee',
          height: 30,
          marginTop: 15,
          flex: 1,
          paddingHorizontal: 15,
        }}>
        <View style={style.methodCard}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {friends.map((v, i) => (
              <TouchableOpacity key={i}>
                <View>
                  <Image
                    source={v.image}
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
                    {v.title.substring(0, 6)}
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
    height: 150,
    flex: 1,
    paddingHorizontal: 20,
  },
});
