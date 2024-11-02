import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import ButtonSquare from '@/components/button-square';

const x = Dimensions.get('window').height;
const y = Dimensions.get('window').width;

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
      title: 'Ders Planı Hazırla',
      path: '/(app)/lesson-plan',
      icon: 'calendar'

    },
  ])
  return (
    <View style={styles.container}>

      <View style={{height:230}}>
        <FlatList
          data={buttons}
          renderItem={({item}) => <ButtonSquare title={item.title} path={item.path} icon={item.icon}/>}
          numColumns={2}
          contentContainerStyle={{alignItems:"center", gap:30, justifyContent:"center"}}
          columnWrapperStyle={{gap:30, height:100}}
          style={{}}

        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:"center",
    
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
