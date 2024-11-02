import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MessageBox({
  direction,
  text,
  image
}: {
  direction: string;
  text: string;
  image?: string;
}) {
  const [bubbleWidth, setBubbleWidth] = useState(0);
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
        <View style={styles.rightView}
        onLayout={(event) => {
          const {x, y, width, height} = event.nativeEvent.layout;
          setBubbleWidth(width);
        }}
        >
          { image &&
          <Image
            source={{ uri: image }}
            style={[styles.image, { width: bubbleWidth-25 }]}
            contentFit="contain"
          />}
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
    gap: 5,
  },
  image: {
    //width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 7,
  }
});
