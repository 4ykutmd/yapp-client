import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from 'react-native';


export default function ButtonSquare({title, path, icon}:{title:string, path:string, icon:string}) {
    return <Pressable 
      style={styles.button}
      //@ts-ignore
      onPress={() => {router.push(path)}}
    >
        <Text style={styles.text}>{title}</Text>
        { 
          icon == 'question-circle' ? <FontAwesome6 name="question-circle" size={24} color="white" /> :
          icon == 'file-pen' ? <FontAwesome6 name="file-pen" size={24} color="white" /> :
          icon == 'book-open' ? <FontAwesome6 name="book-open" size={24} color="white" /> :
          icon == 'calendar' ? <Feather name="calendar" size={24} color="white" /> :
          icon == '' ? <FontAwesome6 name="" size={24} color="white" /> : null
          
        }

    </Pressable>
  
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#5781ea',
    borderRadius: 10,
    gap:10
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center'
  }
});
