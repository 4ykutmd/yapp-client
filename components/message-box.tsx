import { StyleSheet, Text } from "react-native";
import { View } from "./Themed";

export default function MessageBox({
  direction,
  text,
}: {
  direction: string;
  text: string;
}) {
  if (direction == "left") {
    return (
      <View style={styles.leftView}>
        <Text style={{ color: "white" }}>{text}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.rightView}>
        <Text>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftView: {
    width: "80%",
    minHeight: 50,
    padding: "3%",
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#5781ea",
  },

  rightView: {
    width: "80%",
    minHeight: 50,
    padding: "3%",
    alignSelf: "flex-end",
    alignItems: "flex-start",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#5781ea",
    borderRadius: 10,
  },
});
