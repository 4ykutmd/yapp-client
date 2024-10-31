import { View } from "@/components/Themed";
import axios from "axios";
import { Pressable, StyleSheet, Text } from "react-native";


export default function Page() {

  let req = async () => {
    try {
      let res = await axios.get(
          "http://IP:3000/api/soru-sor",{
            params:{
              soru: 'organik kimya',
              type: '4'
            }
          }
      )
      console.log(res)
      return res
    } catch (error) {
        console.error(error);
        return null;
    }

  }

  return (
    <View style={styles.main}>
      
      <Pressable onPress={req}><Text>bas</Text></Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  
});
