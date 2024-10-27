import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, router, Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {display:'none'},
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarStyle: {display:'none'},
          
        }}
      />

      <Tabs.Screen
        name="ask-question"
        options={{
          title: 'Soru Sor',
          headerLeft:() => (
            <Pressable
            style={{paddingLeft:15}} 
            onPress={() => {
              router.back()

            }}>
              <Ionicons name="arrow-back-outline" size={28} color="black"/>
            </Pressable>
          )
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
