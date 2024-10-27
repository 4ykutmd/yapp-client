import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from 'react-native';


export default function Button1({title, path}:{title:string, path:string}) {
    return <Pressable 
      style={styles.button}
      //@ts-ignore
      onPress={() => {router.push(path)}}
    >
        <Text style={styles.text}>{title}</Text>

    </Pressable>
  
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: 'gray',
    borderRadius: 10
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold'
  }
});
