import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type PersonalInfoProps = {
  personalInfo: PersonalInfo;
  onUpdatePersonalInfo: (field: keyof PersonalInfo, value: string) => void;
};

export default function PersonalInfo({ personalInfo, onUpdatePersonalInfo }: PersonalInfoProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <Pressable
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}>
          <Ionicons name={isEditing ? 'checkmark-circle' : 'pencil'} size={24} color="#ffd33d" />
          <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </Pressable>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={personalInfo.firstName}
              onChangeText={(value) => onUpdatePersonalInfo('firstName', value)}
              placeholder="Enter first name"
              placeholderTextColor="#666"
            />
          ) : (
            <Text style={styles.infoText}>{personalInfo.firstName || 'Not provided'}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={personalInfo.lastName}
              onChangeText={(value) => onUpdatePersonalInfo('lastName', value)}
              placeholder="Enter last name"
              placeholderTextColor="#666"
            />
          ) : (
            <Text style={styles.infoText}>{personalInfo.lastName || 'Not provided'}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={personalInfo.email}
              onChangeText={(value) => onUpdatePersonalInfo('email', value)}
              placeholder="Enter email"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          ) : (
            <Text style={styles.infoText}>{personalInfo.email || 'Not provided'}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={personalInfo.phone}
              onChangeText={(value) => onUpdatePersonalInfo('phone', value)}
              placeholder="Enter phone number"
              placeholderTextColor="#666"
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.infoText}>{personalInfo.phone || 'Not provided'}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  infoText: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editButtonText: {
    color: '#ffd33d',
    fontSize: 16,
    fontWeight: '500',
  },
});