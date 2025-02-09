import { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

type Coordinates = {
  lat: number;
  lng: number;
};

type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
  coordinates: Coordinates;
};

type Mechanic = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  phone: string;
  address: Address;
};

type MapProps = {
  mechanics?: Mechanic[];
  onMechanicSelect?: (mechanic: Mechanic) => void;
};

export default function Map({ mechanics = [], onMechanicSelect }: MapProps) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (!location) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={[
          {
            "elementType": "geometry",
            "stylers": [{ "color": "#242f3e" }]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#746855" }]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#242f3e" }]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{ "color": "#17263c" }]
          }
        ]}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="You are here"
          pinColor="#ffd33d"
        />
        {mechanics.map((mechanic) => (
          <Marker
            key={mechanic.id}
            coordinate={{
              latitude: mechanic.latitude,
              longitude: mechanic.longitude,
            }}
            title={mechanic.name}
            description={`Rating: ${mechanic.rating}/5`}
            onPress={() => onMechanicSelect?.(mechanic)}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    overflow: 'hidden',
    borderRadius: 10,
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
});