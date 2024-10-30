import React from 'react';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import HeaderBackButton from '@/components/header-back';


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
            <HeaderBackButton/>
          )
        }}
        
      />
      <Tabs.Screen
        name="create-test"
        options={{
          title: 'Test Oluştur',
          headerLeft:() => (
            <HeaderBackButton/>
          )
        }}
      />
    </Tabs>
  );
}
