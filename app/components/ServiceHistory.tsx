import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ServiceRecord = {
  id: string;
  vehicleId: string;
  date: string;
  serviceType: string;
  description: string;
  cost: number;
  mechanic: {
    name: string;
    shop: string;
  };
};

type ServiceHistoryProps = {
  records?: ServiceRecord[];
};

export default function ServiceHistory({ records = [] }: ServiceHistoryProps) {
  return (
    <ScrollView style={styles.container}>
      {records.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="build-outline" size={48} color="#666" />
          <Text style={styles.emptyStateText}>No service records yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Service records will appear here when you add them
          </Text>
        </View>
      ) : (
        records.map((record) => (
          <View key={record.id} style={styles.recordCard}>
            <View style={styles.recordHeader}>
              <Text style={styles.date}>{record.date}</Text>
              <Text style={styles.cost}>${record.cost.toFixed(2)}</Text>
            </View>
            <Text style={styles.serviceType}>{record.serviceType}</Text>
            <Text style={styles.description}>{record.description}</Text>
            <View style={styles.mechanicInfo}>
              <Ionicons name="person-outline" size={16} color="#999" />
              <Text style={styles.mechanicText}>
                {record.mechanic.name} at {record.mechanic.shop}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateText: {
    color: '#666',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptyStateSubtext: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  recordCard: {
    backgroundColor: '#1a1d21',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  cost: {
    color: '#ffd33d',
    fontSize: 16,
    fontWeight: '600',
  },
  serviceType: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    color: '#999',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  mechanicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mechanicText: {
    color: '#999',
    fontSize: 14,
  },
});