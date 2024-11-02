import { View } from "@/components/Themed";
import axios from "axios";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";

export default function Page() {
  const [input, setInput] = useState("");
  const [data, setData] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  let req = async () => {
    try {
      let res = await axios.get(
        `http://192.168.1.7:3000/api/soru-sor?soru=${input}&type=5`
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
            placeholder="Ders planı hazırlancak konu"
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
        <FlatList
          data={data}
          renderItem={({ item, index }: { item: any; index: number }) => (
            <View
              style={{
                alignItems: "center",
                width: "100%",
                padding: 10,
                borderWidth: 1,
                borderColor: "#5781ea",
                borderRadius: 15,
              }}
            >
              <View style={{ width: "100%", alignItems: "center" }}>
                <Text
                  style={{
                    marginBottom: 20,
                    fontSize: 18,
                    fontWeight: "bold",
                    borderBottomWidth: 0.7,
                  }}
                >
                  {item.gün}
                </Text>
              </View>
              <View style={{ width: "90%" }}>
                <Text style={{ marginBottom: 20 }}>{item.konu}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 30 }}
          //columnWrapperStyle={{width:"100%"}}
          style={{ width: "100%" }}
        />
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
