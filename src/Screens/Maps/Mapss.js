import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import {Button, Input} from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {db} from '../../Config/Firebase';
import {FlatList} from 'react-native-gesture-handler';

export default class Mapss extends Component {
  state = {
    name: '',
    data: [],
    latitude: '',
    longitude: '',
  };

  addData = (name, latitude, longitude) => {
    try {
      db.ref('/data-name').push({
        name,
        latitude,
        longitude,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  handleSend = () => {
    const {name, latitude, longitude} = this.state;
    this.addData(name, latitude, longitude);
    // this.setState({name: '', latitude: '', longitude: ''});
  };

  componentDidMount() {
    this.listenData();
  }

  listenData = () => {
    let itemsRef = db.ref('data-name');
    itemsRef.on('value', res => {
      let data = res.val();
      if (data) {
        const objectArray = Object.values(data);
        this.setState({data: objectArray});
        console.log('data', objectArray);
      }
    });
  };

  handleMove = () => {
    this.refs.map.animateToRegion(
      {
        latitude: -2.976677,
        longitude: 106.8959383,
        latitudeDelta: 0.005,
        longitudeDelta: 0.0101,
      },
      2000,
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={style.container}>
          <MapView
            ref="map"
            provider={PROVIDER_GOOGLE}
            style={style.map}
            initialRegion={{
              latitude: -6.3876732,
              longitude: 106.7477557,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            {this.state.data.length > 0 &&
              this.state.data.map((item, val) => {
                console.log(item);
                return (
                  <Marker
                    title={item.name}
                    coordinate={{
                      latitude: parseFloat(item.latitude),
                      longitude: parseFloat(item.longitude),
                    }}
                  />
                );
              })}
          </MapView>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    height: 400,
    width: 400,
    flex: 1,
  },
  map: {width: '100%', height: '100%'},
  user: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: '#0aa1e3',
  },
  input: {
    backgroundColor: 'white',
    paddingLeft: 20,
  },
});
