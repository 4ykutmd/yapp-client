import { Image, Pressable, StyleSheet, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { View } from "@/components/Themed";
import { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import MessageBox from "@/components/message-box";

export default function Page() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [output, setOutput] = useState("");

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
  const questionPrompt = () => {};

  //TODO cevaplar icin bi tasarim, mesajlar birikecek
  return (
    <View style={styles.container}>
      <View style={styles.chatView}>
        <MessageBox direction="right" text="Bu soruyu çözer misin." />
        <MessageBox
          direction="left"
          text="Tabiki! İşte Çözüm kaffşakaşfkdsaşsflkaşslkşldasfdşflkaaşsfld"
        />

        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>

      <View style={{ flexDirection: "row", gap: 5 }}>
        <Pressable onPress={pickImage} style={styles.button}>
          <Feather name="upload" size={24} color="white" />
        </Pressable>

        <TextInput
          style={styles.input}
          placeholder="Soru sor"
          placeholderTextColor={"gray"}
          onChangeText={(e) => {
            setInput(e);
          }}
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
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
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
  chatView: {
    width: "90%",
    height: "88%",
    borderWidth: 1,
    borderColor: "#5781ea",
    borderRadius: 10,
    padding: 10,
    gap: 10,
  },
  image: {
    position: "absolute",
    bottom: "1%",
    width: 50,
    height: 50,
    margin: 10,
    borderWidth: 1,
    borderColor: "#5781ea",
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
    width: 50,
    height: 50,
    backgroundColor: "#5781ea",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
