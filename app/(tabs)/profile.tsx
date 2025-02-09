import { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import VehicleForm from '../components/VehicleForm';
import PersonalInfo from '../components/PersonalInfo';

type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: string;
  vin: string;
};

type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export default function ProfileScreen() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showAddVehicle, setShowAddVehicle] = useState(false);

  const handleUpdatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleRemoveVehicle = (id: string) => {
    setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <PersonalInfo
        personalInfo={personalInfo}
        onUpdatePersonalInfo={handleUpdatePersonalInfo}
      />

      <View style={styles.section}>
        <Link href="/service-history" style={styles.menuItem}>
          <Ionicons name="time" size={24} color="#ffd33d" />
          <Text style={styles.menuItemText}>View Service History</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </Link>

        <Link href="/help" style={styles.menuItem}>
          <Ionicons name="help-circle" size={24} color="#ffd33d" />
          <Text style={styles.menuItemText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </Link>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Vehicles</Text>
          <Pressable
            style={styles.addButton}
            onPress={() => setShowAddVehicle(true)}>
            <Ionicons name="add-circle" size={24} color="#ffd33d" />
            <Text style={styles.addButtonText}>Add Vehicle</Text>
          </Pressable>
        </View>

        {showAddVehicle && (
          <VehicleForm
            onSubmit={(vehicle) => {
              setVehicles(prev => [...prev, { ...vehicle, id: Date.now().toString() }]);
              setShowAddVehicle(false);
            }}
            onCancel={() => setShowAddVehicle(false)}
          />
        )}

        {vehicles.map(vehicle => (
          <View key={vehicle.id} style={styles.vehicleItem}>
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>{vehicle.year} {vehicle.make} {vehicle.model}</Text>
              {vehicle.vin && <Text style={styles.vehicleVin}>VIN: {vehicle.vin}</Text>}
            </View>
            <Pressable
              style={styles.removeButton}
              onPress={() => handleRemoveVehicle(vehicle.id)}>
              <Ionicons name="trash-outline" size={20} color="#ff4444" />
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1d21',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  menuItemText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  form: {
    backgroundColor: '#1a1d21',
    borderRadius: 10,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#25292e',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButtonText: {
    color: '#ffd33d',
    fontSize: 16,
    fontWeight: '500',
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1d21',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  vehicleVin: {
    color: '#999',
    fontSize: 14,
    marginTop: 4,
  },
  removeButton: {
    padding: 8,
  },
});