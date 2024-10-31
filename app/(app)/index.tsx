import { FlatList, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import ButtonSquare from '@/components/button-square';

export default function TabOneScreen() {
  //TODO diger sayfalarin isimleri ve yollari eklenebilir
  const [buttons, setButtons] = useState([
    {
      title: 'Soru Sor',
      path: '/(app)/ask-question',
      icon: 'question-circle'
    },
    {
      title: 'Test Hazırla',
      path: '/(app)/create-test',
      icon: 'file-pen'

    },
    {
      title: 'Konu Anlatımı',
      path: '/(app)/lecture',
      icon: 'book-open'

    },
    {
      title: 'buton2',
      path: '/(app)/ask-question',
      icon: ''

    },
    {
      title: 'buton3',
      path: '/(app)/ask-question',
      icon: ''

    }
  ])
  return (
    <View style={styles.container}>

      <FlatList
        data={buttons}
        renderItem={({item}) => <ButtonSquare title={item.title} path={item.path} icon={item.icon}/>}
        numColumns={2}
        contentContainerStyle={{alignItems:"center", gap:30}}
        columnWrapperStyle={{gap:30}}
        style={{backgroundColor:"#3254b1"}}

      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 25,
    alignItems:'center',
    
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
