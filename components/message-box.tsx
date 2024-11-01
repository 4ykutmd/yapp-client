import { StyleSheet, Text, View } from "react-native";

export default function MessageBox({
  direction,
  text,
}: {
  direction: string;
  text: string;
}) {
  if (direction == "left") {
    return (
      <View style={{width: '100%'}}>
        <View style={styles.leftView}>
          <Text style={{ color: "white" }}>{text}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{width: '100%'}}>
        <View style={styles.rightView}>
          <Text>{text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftView: {
    width: "auto",
    padding: "3%",
    maxWidth: "75%",
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#5781ea",
  },

  rightView: {
    width: "auto",
    padding: "3%",
    maxWidth: "75%",
    alignSelf: "flex-end",
    alignItems: "flex-start",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#5781ea",
    borderRadius: 10,
  },
});
