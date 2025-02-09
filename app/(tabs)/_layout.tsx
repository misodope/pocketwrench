import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      /> 
      <Tabs.Screen
        name="fix"
        options={{
          title: 'Fix',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'hammer' : 'hammer-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: 'Help',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
