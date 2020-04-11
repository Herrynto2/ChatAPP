import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';
import {Alert} from 'react-native';

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.0102,
  longitudeDelta: 0.1021,
};
export default function Maps(props) {
  const [currentPosition, setCurrentPosition] = React.useState(initialState);
  React.useEffect(() => {
    geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      setCurrentPosition({
        ...currentPosition,
        latitude,
        longitude,
      });
    }),
      error => Alert(error.message);
  }, []);

  return currentPosition.latitude ? (
    <MapView
      showsUserLocation
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={currentPosition}
    />
  ) : (
    <ActivityIndicator />
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
});
