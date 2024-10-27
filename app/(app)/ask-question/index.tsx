import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function Page() {
  return (
    //TODO mesaj kutusu, foto yukleme
    <View style={styles.container}>
      <Text>
        Soru sor
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
