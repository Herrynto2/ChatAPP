import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Overlay, Image} from 'react-native-elements';
import Success from '../Helper/Image/checklist.jpg';

function OverlayImg(props) {
  return (
    <View>
      <Overlay
        isVisible={props.isVisible}
        windowBackgroundColor="rgba(46, 46, 46, .8)"
        overlayBackgroundColor="white"
        width={300}
        height={280}
        borderRadius={20}
        style={{padding: 20}}
        overlayStyle={{padding: 20, paddingTop: 40}}>
        <>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: '#545454',
              marginTop: -10,
            }}>
            {props.message}
          </Text>
          <View style={{alignSelf: 'center', marginTop: 20}}>
            <Image source={Success} style={{width: 100, height: 100}} />
          </View>
          <Button
            title="OK"
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
    width: '50%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#1d57b6',
    elevation: 4,
  },
});
export default OverlayImg;
