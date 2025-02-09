import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import ServiceHistory from './components/ServiceHistory';
import Map from './components/Map';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Service History',
          headerStyle: {
            backgroundColor: '#25292e',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
});