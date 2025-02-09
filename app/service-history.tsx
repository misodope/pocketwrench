import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import ServiceHistory from './components/ServiceHistory';

export default function ServiceHistoryScreen() {
  // Mock data for demonstration
  const mockRecords = [
    {
      id: '1',
      vehicleId: '1',
      date: '2024-01-15',
      serviceType: 'Oil Change',
      description: 'Regular maintenance - synthetic oil change and filter replacement',
      cost: 89.99,
      mechanic: {
        name: 'John Smith',
        shop: 'Quick Lube Express'
      }
    },
    {
      id: '2',
      vehicleId: '1',
      date: '2023-12-20',
      serviceType: 'Brake Service',
      description: 'Front brake pad replacement and rotor resurfacing',
      cost: 299.99,
      mechanic: {
        name: 'Mike Johnson',
        shop: 'Precision Auto Care'
      }
    }
  ];

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
      <ServiceHistory records={mockRecords} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
});