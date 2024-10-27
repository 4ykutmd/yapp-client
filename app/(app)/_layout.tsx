import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Ionicons } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {display:'none'}
        
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarStyle: {display:'none'},
          headerRight: () => (
            <Link href="/" asChild>
              <Ionicons name="arrow-back-outline" size={24} color="black"/>
            </Link>
          )
        }}
      />

      <Tabs.Screen
        name="ask-question"
        options={{
          title: 'Soru Sor',
        }}
      />
      <Tabs.Screen
        name="create-test"
        options={{
          title: 'Test Olustur',
        }}
      />
    </Tabs>
  );
}
