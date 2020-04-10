import React from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';
export default function Maps(props) {
  const [currentPosition, setCurrentPosition] = React.useState(false);
  React.useEffect(() => {
    geolocation.getCurrentPosition(
      position => {
        if (position) {
          console.log(position.coords);
          setCurrentPosition(position.coords);
        }
      },
      err => {
        if (err.code === 1) {
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
        } else if (err.code === 2) {
          console.log('error');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 60000,
        maximumAge: 1000,
      },
    );
  }, []);
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: currentPosition
            ? currentPosition.latitude
            : -6.8205799999999995,
          longitude: currentPosition
            ? currentPosition.longitude
            : 106.81851166666665,
          latitudeDelta: 0.005,
          longitudeDelta: 0.0021,
        }}>
        <Marker
          coordinate={{
            latitude: currentPosition
              ? currentPosition.latitude
              : -6.8205799999999995,
            longitude: currentPosition
              ? currentPosition.longitude
              : 106.81851166666665,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
});
