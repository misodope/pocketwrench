import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import Help from './components/Help';

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Help & Support',
          headerStyle: {
            backgroundColor: '#25292e',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Help />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
});