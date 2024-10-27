import { Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import Button1 from '@/components/button-1';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>

      
      <Button1 title='Soru sor'/>
      <Button1 title='Test Hazirla'/>
      <Button1 title='Selamlar'/>
      <Button1 title='Selamlar'/>

      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 25,
    gap: 15
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
