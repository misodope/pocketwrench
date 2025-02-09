import { Text, View, StyleSheet, TextInput, FlatList, Pressable, Linking } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Map from '../components/Map';

const mechanics = [
  {
    id: '1',
    name: 'John Smith',
    specialty: 'General Repairs',
    rating: 4.8,
    phone: '123-456-7890',
    address: {
      street: '1234 South Lamar Blvd',
      city: 'Austin',
      state: 'TX',
      zip: '78704',
      coordinates: {
        lat: 30.2516,
        lng: -97.7636
      }
    }
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    specialty: 'Engine Specialist',
    rating: 4.9,
    phone: '123-456-7890',
    address: {
      street: '2200 East Riverside Dr',
      city: 'Austin',
      state: 'TX',
      zip: '78741',
      coordinates: {
        lat: 30.2397,
        lng: -97.7248
      }
    }
  },
  {
    id: '3',
    name: 'Mike Brown',
    specialty: 'Transmission Expert',
    rating: 4.7,
    phone: '123-456-7890',
    address: {
      street: '8940 Research Blvd',
      city: 'Austin',
      state: 'TX',
      zip: '78758',
      coordinates: {
        lat: 30.3714,
        lng: -97.7205
      }
    }
  },
  {
    id: '4',
    name: 'Lisa Davis',
    specialty: 'Electrical Systems',
    rating: 4.6,
    phone: '123-456-7890',
    address: {
      street: '3810 South Congress Ave',
      city: 'Austin',
      state: 'TX',
      zip: '78704',
      coordinates: {
        lat: 30.2270,
        lng: -97.7511
      }
    }
  },
  {
    id: '5',
    name: 'David Wilson',
    specialty: 'Brake Specialist',
    rating: 4.8,
    phone: '123-456-7890',
    address: {
      street: '5525 Burnet Rd',
      city: 'Austin',
      state: 'TX',
      zip: '78756',
      coordinates: {
        lat: 30.3320,
        lng: -97.7396
      }
    }
  },
];

export default function MechanicsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);
  
  const filteredMechanics = mechanics.filter(mechanic =>
    mechanic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mechanic.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleMessage = (phone: string) => {
    Linking.openURL(`sms:${phone}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.mechanicItem}>
      <View style={styles.mechanicInfo}>
        <Text style={styles.mechanicName}>{item.name}</Text>
        <Text style={styles.mechanicSpecialty}>{item.specialty}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#ffd33d" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <Pressable
          style={[styles.actionButton, styles.messageButton]}
          onPress={() => handleMessage(item.phone)}>
          <Ionicons name="chatbubble-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Message</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.callButton]}
          onPress={() => handleCall(item.phone)}>
          <Ionicons name="call-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Call</Text>
        </Pressable>
      </View>
    </View>
  );

  if (showMap) {
    return (
      <View style={styles.container}>
        <Pressable
          style={[styles.actionButton, styles.mapButton, styles.backButton]}
          onPress={() => setShowMap(false)}>
          <Ionicons name="arrow-back" size={20} color="black" />
          <Text style={styles.mapButtonText}>Back to List</Text>
        </Pressable>
        <Map mechanics={mechanics} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#fff" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search mechanics by name or specialty"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <Pressable
        style={[styles.actionButton, styles.mapButton]}
        onPress={() => setShowMap(true)}>
        <Ionicons name="map-outline" size={20} color="black" />
        <Text style={styles.mapButtonText}>View Mechanics on Map</Text>
      </Pressable>
      <FlatList
        data={filteredMechanics}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1d21',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#fff',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
  mechanicItem: {
    backgroundColor: '#1a1d21',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  mechanicInfo: {
    marginBottom: 12,
  },
  mechanicName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mechanicSpecialty: {
    color: '#999',
    fontSize: 14,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 4,
  },
  messageButton: {
    backgroundColor: '#2c3e50',
  },
  callButton: {
    backgroundColor: '#27ae60',
  },
  mapButton: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  mapButtonText: {
    color: '#000000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
});