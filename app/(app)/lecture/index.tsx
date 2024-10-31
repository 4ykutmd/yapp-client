import { View } from "@/components/Themed";
import axios from "axios";
import { Pressable, StyleSheet, Text } from "react-native";


export default function Page() {

  return (
    <View style={styles.main}>
      
      <Pressable><Text>bas</Text></Pressable>
      
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
