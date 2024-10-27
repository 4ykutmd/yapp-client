import {StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ButtonSquare from '@/components/button-square';

export default function TabOneScreen() {
  //TODO diger sayfalarin isimleri ve yollari eklenebilir
  const [buttons, setButtons] = useState([
    {
      title: 'Soru Sor',
      path: '/(app)/ask-question'
    },
    {
      title: 'Test Hazirla',
      path: '/(app)/create-test'

    },
    {
      title: 'Konu anlatimi',
      path: '/(app)/ask-question'

    },
    {
      title: 'buton2',
      path: '/(app)/ask-question'

    },
    {
      title: 'buton3',
      path: '/(app)/ask-question'

    }
  ])
  return (
    <View style={styles.container}>

      <FlatList
        data={buttons}
        renderItem={({item}) => <ButtonSquare title={item.title} path={item.path}/>}
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
