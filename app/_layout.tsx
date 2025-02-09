import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="login" options={{ title: 'Login', headerBackTitle: 'Back to Home' }} />
      <Stack.Screen name="service-history" options={{ title: 'Service History', headerBackTitle: 'Back to Profile' }} />
      <Stack.Screen name="help" options={{ title: 'Help & Support', headerBackTitle: 'Back to Profile' }} />
    </Stack>
  );
}
