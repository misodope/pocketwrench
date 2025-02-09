import { Text, View, StyleSheet, TextInput, FlatList, Pressable } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const commonProblems = [
  { id: '1', title: 'Check Engine Light', description: 'Diagnose and fix check engine light issues' },
  { id: '2', title: 'Brake Problems', description: 'Troubleshoot brake system problems' },
  { id: '3', title: 'Battery Issues', description: 'Test and fix battery-related problems' },
  { id: '4', title: 'Transmission', description: 'Diagnose transmission problems' },
  { id: '5', title: 'Oil Changes', description: 'Learn about oil maintenance' },
];

export default function FixScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProblems = commonProblems.filter(problem =>
    problem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.problemItem}
      onPress={() => alert(`Selected: ${item.title}`)}>
      <View style={styles.problemContent}>
        <Text style={styles.problemTitle}>{item.title}</Text>
        <Text style={styles.problemDescription}>{item.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#ffd33d" />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#fff" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search common problems"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredProblems}
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
  problemItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1d21',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  problemContent: {
    flex: 1,
  },
  problemTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  problemDescription: {
    color: '#999',
    fontSize: 14,
  },
});
