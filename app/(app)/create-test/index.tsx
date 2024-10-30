import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import DropdownComponent from "@/components/dropdown";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";

const data1 = [
  { label: "İlkokul", value: "1" },
  { label: "Ortaokul", value: "2" },
  { label: "Lise", value: "3" },
  { label: "Lisans", value: "4" },
];

const data2 = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
];

export default function Page() {
  const [input, setInput] = useState("");

  return (
    //TODO soru sayisi secme, konu secme
    <View style={styles.container}>
      <DropdownComponent title="Eğitim Seviyesi" data={data1} />
      <DropdownComponent title="Sınıf" data={data2} />

      <TextInput
          style={styles.input}
          placeholder="Organik kimya, Rasyonel Sayılar ..."
          placeholderTextColor={"gray"}
          onChangeText={(e) => {
            setInput(e);
          }}
        />

      <Pressable style={styles.button}>
        <Text style={{color:"white", fontWeight:"bold",fontSize:16}}>Oluştur</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap:15
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    width: "65%",
    height: 50,
    borderRadius: 30,
    padding: 10,
    paddingLeft: 15,
    borderWidth: 2,
    borderColor: "#5781ea",
  },
  button: {
    minWidth: "22%",
    minHeight: 35,
    padding:5,
    marginTop:"30%",
    backgroundColor:"#5781ea",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center",
    
  }
});
