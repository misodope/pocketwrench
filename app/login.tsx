import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { type } = useLocalSearchParams();

  const handleEmailLogin = () => {
    // TODO: Implement email/password authentication
    router.replace('/');
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth
    router.replace('/');
  };

  const handleAppleSignIn = () => {
    // TODO: Implement Apple Sign In
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Pocket Wrench</Text>
        <Text style={styles.subtitle}>{type === 'mechanic' ? 'Sign in as Mechanic' : 'Sign in to continue'}</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#666"
            secureTextEntry
          />
        </View>

        <Pressable style={styles.loginButton} onPress={handleEmailLogin}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </Pressable>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtons}>
          <Pressable style={[styles.socialButton, styles.googleButton]} onPress={handleGoogleSignIn}>
            <Ionicons name="logo-google" size={24} color="#fff" />
            <Text style={styles.socialButtonText}>Google</Text>
          </Pressable>

          <Pressable style={[styles.socialButton, styles.appleButton]} onPress={handleAppleSignIn}>
            <Ionicons name="logo-apple" size={24} color="#fff" />
            <Text style={styles.socialButtonText}>Apple</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 16,
  },
  header: {
    marginTop: 60,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
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
  loginButton: {
    backgroundColor: '#ffd33d',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#25292e',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#3a3f44',
  },
  dividerText: {
    color: '#999',
    marginHorizontal: 16,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  googleButton: {
    backgroundColor: '#db4437',
  },
  appleButton: {
    backgroundColor: '#000',
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});