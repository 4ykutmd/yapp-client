import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";

export default function HeaderBackButton() {
  return (
    <Pressable
      style={{ paddingLeft: 15 }}
      onPress={() => {
        router.back();
      }}
    >
      <Ionicons name="arrow-back-outline" size={28} color="black" />
    </Pressable>
  );
}
