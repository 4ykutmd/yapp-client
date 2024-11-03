import axios from "axios";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";

export default function Page() {
  const [input, setInput] = useState("");
  const [data, setData] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  let req = async () => {
    try {
      let res = await axios.get(
        `http://192.168.1.3:3000/api/soru-sor?soru=${input}&type=3`
      );

      try {
        const result = JSON.parse(res.data.cevap);
        console.log(result);
        setData(result);
        setIsAnswered(true);
        setIsLoading(false);
      } catch (error) {
        const result = res.data.cevap;
        console.log(result);
        setData(result);
        setIsAnswered(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.main}>
      {/* <DropdownComponent title="Eğitim Seviyesi" data={data1} /> */}
      {/* <DropdownComponent title="Sınıf" data={data2} /> */}

      {!isAnswered && (
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input}
            placeholder="Anlatılacak konuyu yazınız"
            placeholderTextColor={"gray"}
            onChangeText={setInput}
          />

          <Pressable
            style={styles.button}
            onPress={() => {
              req();
              setIsLoading(true);
              setIsAnswered(true);
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Gönder
            </Text>
          </Pressable>
        </View>
      )}
      {isloading && (
        <View style={{ position: "absolute", top: "45%" }}>
          <ActivityIndicator size={60} />
        </View>
      )}

      {data && (
        <ScrollView>
          <Text style={{}}>{data}</Text>
        </ScrollView>
      )}

      {data && (
        <Pressable
          style={styles.button}
          onPress={() => {
            setData("");
            setIsLoading(false);
            setIsAnswered(false);
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Temizle
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    padding: 20,
  },
  input: {
    width: 250,
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
    padding: 5,
    marginTop: "5%",
    backgroundColor: "#5781ea",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
