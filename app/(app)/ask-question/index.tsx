import { Button, Image, Pressable, StyleSheet, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default function Page() {
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [output, setOutput] = useState('');


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  //TODO request
  const questionPrompt = () => {

  }

  //TODO cevaplar icin bi tasarim, mesajlar birikecek mi
  return (
    <View style={styles.container}>

      <View style={{width:'90%', height:'88%', borderWidth:1, borderColor:'#5781ea', borderRadius: 10}}>
        <Text>
          cevaplar zart zurt
        </Text>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>

      

      <View style={{flexDirection:'row', gap:5}}>

        <Pressable onPress={pickImage} style={styles.button}>
          <AntDesign name="picture" size={24} color="white" />
        </Pressable>

        <TextInput
          style={styles.input} placeholder='Soru sor' placeholderTextColor={'gray'} 
          onChangeText={(e) => {setInput(e)}}
        />

        <Pressable onPress={questionPrompt} style={styles.button}>
          <Ionicons name="send" size={24} color="white" />
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap:15
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
  image: {
    position:'absolute',
    bottom: '1%',
    width: 50,
    height: 50,
    margin:10,
    borderWidth:1,
    borderColor: '#5781ea',
  },
  input: {
    width:'65%', 
    height:50, 
    borderRadius:30, 
    padding:10, 
    paddingLeft:15, 
    borderWidth:2, 
    borderColor:'#5781ea',
  },
  button: {
    width:50, 
    height:50, 
    backgroundColor:'#5781ea', 
    borderRadius:20, 
    justifyContent:'center', 
    alignItems:'center'
  }
});