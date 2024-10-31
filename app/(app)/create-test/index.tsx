import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import axios from "axios";

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
  const [data, setData] = useState()

  let req = async () => {
    try {
      let res = await axios.get(
          "http://192.168.1.7:3000/api/soru-sor?soru=rasyonel sayilar&type=4",{
            
          }
      )
      
      console.log(res.data.cevap)
      setData(res.data.cevap)
      console.log(data)
      return res
    } catch (error) {
        console.error(error);
        return null;
    }

  }

  return (
    //TODO soru sayisi secme, konu secme
    <View style={styles.main}>
      {/* <DropdownComponent title="Eğitim Seviyesi" data={data1} /> */}
      {/* <DropdownComponent title="Sınıf" data={data2} /> */}
      <View style={{alignItems:'center'}}>

        <TextInput
            style={styles.input}
            placeholder="Organik kimya, Rasyonel Sayılar ..."
            placeholderTextColor={"gray"}
            onChangeText={(e) => {
              setInput(e);
            }}
          />

        <Pressable style={styles.button} onPress={req}>
          <Text style={{color:"white", fontWeight:"bold",fontSize:16}}>Oluştur</Text>
        </Pressable>

        
        <FlatList
          data={data}
          renderItem={({item}) => <Text>{item.cevap[0]}asd</Text>}
          numColumns={2}
          contentContainerStyle={{alignItems:"center", gap:30}}
          columnWrapperStyle={{gap:30}}
          style={{}}

        />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap:15
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
    width: 100,
    minHeight: 35,
    padding:5,
    marginTop:"30%",
    backgroundColor:"#5781ea",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center",
    
  }
});
