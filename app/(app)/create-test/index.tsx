import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import axios from "axios";
import { TestType } from "@/types/test.types";
import React from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<TestType[]>();
  const [isAnswered, setIsAnswered] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [reset, setReset] = useState(false);

  let req = async () => {
    try {
      let res = await axios.get(
        `http://192.168.1.7:3000/api/soru-sor?soru=${input}&type=4`
      );

      try {
        const result = JSON.parse(res.data.cevap);
        console.log(result);
        setData(result);
        setIsAnswered(true);
        setIsLoading(false);
        setReset(true);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    //TODO soru sayisi secme
    <View style={styles.main}>
      {/* <DropdownComponent title="Eğitim Seviyesi" data={data1} /> */}
      {/* <DropdownComponent title="Soru sayısı" data={data2} /> */}

      {!isAnswered && (
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input}
            placeholder="Test konusunu yazınız"
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
              Oluştur
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
          renderItem={({ item, index }) => (
            <View style={{ alignItems: "flex-start" }}>
              <Text style={{ marginBottom: 20 }}>
                {index + 1}- {item.soru}
              </Text>

              {item.secenekler.map((secenek, index) => (
                <View key={index} style={{ marginLeft: 15 }}>
                  <Text
                    style={{
                      padding: 5,
                      marginBottom: 5,
                      borderWidth: 0.3,
                      borderRadius: 5,
                    }}
                  >
                    {secenek}
                  </Text>
                </View>
              ))}
            </View>
          )}
          contentContainerStyle={{ alignItems: "flex-start", gap: 30 }}
          //columnWrapperStyle={{gap:30}}
          style={{}}
        />
      )}
      {reset && (
        <View
          style={{
            height: "auto",
            borderTopWidth: 0.7,
            paddingTop: 5,
            width: "100%",
            alignItems: "center",
          }}
        >
          {isOpened === false ? (
            <Pressable
              onPress={() => {
                setIsOpened(true);
              }}
              style={styles.button}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                Cevaplar
              </Text>
            </Pressable>
          ) : (
            <View
              style={{
                height: 120,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ScrollView style={{ flexDirection: "row" }} horizontal>
                {data?.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 10,
                    }}
                  >
                    <Text style={{ padding: 5, marginBottom: 5 }}>
                      {index + 1}-
                    </Text>
                    <Text
                      style={{
                        padding: 5,
                        marginBottom: 5,
                        borderWidth: 0.5,
                        borderRadius: 5,
                      }}
                    >
                      {item.cevap}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <Pressable
                style={styles.button}
                onPress={() => {
                  setIsOpened(false);
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                >
                  Gizle
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      )}

      {reset && (
        <Pressable
          style={styles.button}
          onPress={() => {
            setData([]);
            setIsLoading(false);
            setIsAnswered(false);
            setReset(false);
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Yeni test
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
