import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: string;
  vin: string;
};

type VehicleFormProps = {
  onSubmit: (vehicle: Omit<Vehicle, 'id'>) => void;
  onCancel?: () => void;
};

const carMakes = [
  { label: 'Select Make', value: '' },
  { label: 'Toyota', value: 'Toyota' },
  { label: 'Honda', value: 'Honda' },
  { label: 'Ford', value: 'Ford' },
  { label: 'Chevrolet', value: 'Chevrolet' },
  { label: 'Nissan', value: 'Nissan' },
  { label: 'BMW', value: 'BMW' },
  { label: 'Mercedes-Benz', value: 'Mercedes-Benz' },
  { label: 'Audi', value: 'Audi' },
  { label: 'Hyundai', value: 'Hyundai' },
  { label: 'Kia', value: 'Kia' },
];

const carModels: { [key: string]: string[] } = {
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'HR-V'],
  Ford: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Edge', 'Bronco'],
  Chevrolet: ['Silverado', 'Equinox', 'Malibu', 'Traverse', 'Tahoe', 'Suburban'],
  Nissan: ['Altima', 'Rogue', 'Sentra', 'Maxima', 'Pathfinder', 'Murano'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5', '7 Series', 'M3'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'A-Class'],
  Audi: ['A4', 'A6', 'Q5', 'Q7', 'A3', 'Q3'],
  Hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona', 'Palisade'],
  Kia: ['Forte', 'K5', 'Sportage', 'Telluride', 'Sorento', 'Soul'],
};

export default function VehicleForm({ onSubmit, onCancel }: VehicleFormProps) {
  const [vehicle, setVehicle] = useState<Omit<Vehicle, 'id'>>({
    make: '',
    model: '',
    year: '',
    vin: '',
  });

  const handleSubmit = () => {
    if (vehicle.make && vehicle.model && vehicle.year) {
      onSubmit(vehicle);
    }
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Make</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={vehicle.make}
            onValueChange={(value) => setVehicle(prev => ({ ...prev, make: value, model: '' }))}
            style={styles.picker}
            dropdownIconColor="#fff">
            {carMakes.map(make => (
              <Picker.Item key={make.value} label={make.label} value={make.value} color="#fff" />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Model</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={vehicle.model}
            onValueChange={(value) => setVehicle(prev => ({ ...prev, model: value }))}
            style={styles.picker}
            enabled={!!vehicle.make}
            dropdownIconColor="#fff">
            <Picker.Item label="Select Model" value="" color="#fff" />
            {
              carModels[vehicle.make]?.map(model => (
                <Picker.Item key={model} label={model} value={model} color="#fff" />
              ))
            }
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Year</Text>
        <TextInput
          style={styles.input}
          value={vehicle.year}
          onChangeText={(value) => setVehicle(prev => ({ ...prev, year: value }))}
          placeholder="Enter vehicle year"
          placeholderTextColor="#666"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>VIN (Optional)</Text>
        <TextInput
          style={styles.input}
          value={vehicle.vin}
          onChangeText={(value) => setVehicle(prev => ({ ...prev, vin: value }))}
          placeholder="Enter vehicle VIN"
          placeholderTextColor="#666"
          autoCapitalize="characters"
        />
      </View>

      <View style={styles.buttonContainer}>
        {onCancel && (
          <Pressable style={[styles.button, styles.cancelButton]} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        )}
        <Pressable style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Vehicle</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  pickerContainer: {
    backgroundColor: '#25292e',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 4,
  },
  picker: {
    color: '#fff',
    height: 50,
    width: '100%',
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  button: {
    borderRadius: 8,
    padding: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#ffd33d',
  },
  submitButtonText: {
    color: '#25292e',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#3a3f44',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});