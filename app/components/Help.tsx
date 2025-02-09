import { Text, View, StyleSheet, ScrollView, Linking, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type HelpSection = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const helpSections: HelpSection[] = [
  {
    id: '1',
    title: 'How to Use Pocket Wrench',
    description: 'Take a photo of your car issue or search common problems to get started. Our app will guide you through the diagnosis and repair process.',
    icon: 'information-circle'
  },
  {
    id: '2',
    title: 'Safety First',
    description: 'Always ensure your safety when working on vehicles. If unsure, consult a professional mechanic.',
    icon: 'warning'
  },
  {
    id: '3',
    title: 'Contact Support',
    description: 'Need help with the app? Reach out to our support team.',
    icon: 'mail'
  },
  {
    id: '4',
    title: 'Emergency Services',
    description: 'In case of emergency, contact roadside assistance or local authorities.',
    icon: 'call'
  }
];

export default function Help() {
  const handleContactSupport = () => {
    Linking.openURL('mailto:support@pocketwrench.com');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {helpSections.map(section => (
        <Pressable
          key={section.id}
          style={styles.section}
          onPress={section.id === '3' ? handleContactSupport : undefined}>
          <View style={styles.sectionHeader}>
            <Ionicons name={section.icon} size={24} color="#ffd33d" />
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          <Text style={styles.sectionDescription}>{section.description}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  section: {
    backgroundColor: '#1a1d21',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },
});