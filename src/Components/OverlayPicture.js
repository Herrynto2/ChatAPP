import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import user from '../Helper/Image/users.png';

function OverlayPicture(props) {
  return (
    <View>
      <Overlay
        isVisible={props.isVisible}
        windowBackgroundColor="rgba(46, 46, 46, .8)"
        overlayBackgroundColor="transparent"
        width={340}
        height={500}
        borderRadius={20}
        style={{padding: 0}}
        overlayStyle={{elevation: 0}}>
        <>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: '#545454',
              marginTop: -10,
            }}>
            {console.log(props.picture)}
          </Text>
          <View style={{alignSelf: 'center', marginTop: 20}}>
            <Image
              source={
                (props.picture && {
                  uri: props.picture,
                }) ||
                user
              }
              style={{width: 350, height: 350, borderRadius: 20}}
            />
          </View>
          <Button
            title="X"
            onPress={() => {
              props.setHideVisible(false);
              props.onPressOk && props.onPressOk();
            }}
            buttonStyle={style.confirm}
          />
        </>
      </Overlay>
    </View>
  );
}

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
});
export default OverlayPicture;
