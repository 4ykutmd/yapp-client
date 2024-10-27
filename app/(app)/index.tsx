import {Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import Button1 from '@/components/button-1';
import { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

const data = [
  {
    title: 'Soru Sor'
  },
  {
    title: 'Test Hazirla'
  },
  {
    title: 'Konu anlatimi'
  },
  {
    title: 'buton2'
  },
  {
    title: 'buton3'
  }
]
export default function TabOneScreen() {
  const [buttons, setButtons] = useState([
    {
      title: 'Soru Sor'
    },
    {
      title: 'Test Hazirla'
    },
    {
      title: 'Konu anlatimi'
    },
    {
      title: 'buton2'
    },
    {
      title: 'buton3'
    }
  ])
  return (
    <View style={styles.container}>

      <FlatList
        data={buttons}
        renderItem={({item}) => <Button1 title={item.title}/>}
        numColumns={2}
        contentContainerStyle={{alignItems:"center", gap:30}}
        columnWrapperStyle={{gap:30}}
        style={{}}

      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 25,
    alignItems:'center'
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
