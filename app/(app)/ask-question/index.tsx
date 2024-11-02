import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import MessageBox from "@/components/message-box";
import { MessageData } from "@/types/chat.types";
import {
  Bubble,
  Composer,
  GiftedChat,
  GiftedChatProps,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Send,
} from "react-native-gifted-chat";
import React from "react";
import { ChatRequest } from "@/requests/chat";

export default function Page() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [output, setOutput] = useState("");

  const [messages, setMessages] = useState<MessageData[]>([]);

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

  const questionRequest = async (text: string) => {
    let history = messages.map((message) => {
      return {
        role: message.role,
        parts: [
          {
            text: message.parts.text,
          },
        ],
      };
    }).reverse();
    let res = await ChatRequest({ message: text, history });
    let newMessage: MessageData = {
      id: messages.length + 1,
      role: "model",
      createdAt: new Date(),
      parts: {
        text: res.cevap,
        image: null,
      }
    }
    let myMessage: MessageData = {
      id: messages.length + 2,
      role: "user",
      createdAt: new Date(),
      parts: {
        text: text,
        image: null,
      }
    }
    let newMessages = [newMessage, myMessage];
    setMessages([...newMessages, ...messages]);
  };

  return (
    <View style={styles.main}>
      <GiftedChat
        messagesContainerStyle={styles.chatView}
        user={{
          _id: 1,
        }}
        messages={messages.map((message) => {
          return {
            _id: message.id,
            text: message.parts.text,
            //image: message.parts.image,
            createdAt: message.createdAt,
            user: {
              _id: message.role === "user" ? 1 : 2,
            },
          };
        })}
        onSend={(newMessages) => {
          const newMessage: MessageData = {
            id: newMessages[0]._id,
            role: newMessages[0].user._id === 1 ? "user" : "model",
            createdAt: new Date(newMessages[0].createdAt),
            parts: {
              text: newMessages[0].text,
              image: null,
            }
          }
          setMessages([newMessage, ...messages]);
          console.log(newMessages);
          questionRequest(newMessages[0].text);
        }}
        //render
        renderChatEmpty={() => <Text>Bir şeyler sor...</Text>}
        renderBubble={(props) => (
          <MessageBox
            direction={props.currentMessage?.user?._id === 1 ? "right" : "left"}
            text={props.currentMessage?.text}
          />
        )}
        renderComposer={(props) => (
          <Composer
            {...props}
            textInputStyle={styles.input}
            placeholder="Soru sor"
            placeholderTextColor={"gray"}
          />
        )}
        renderSend={(props) => (
          <Send
            {...props}
            containerStyle={[styles.button, { opacity: props.text ? 1 : 0.5 }]}
            alwaysShowSend
            disabled={!props.text}
          >
            <Ionicons name="send" size={24} color="white" />
          </Send>
        )}
        renderInputToolbar={(props) => (
          <View style={{ flexDirection: "row", gap: 5, width: '94%'}}>
            <Pressable onPress={pickImage} style={styles.button}>
              <Ionicons name="attach" size={24} color="white" />
            </Pressable>
            <InputToolbar {...props} containerStyle={{backgroundColor: 'transparent', width: '87%'}} />
          </View>
        )}
        renderAvatar={() => null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //gap: 15,
    padding: 10,
    backgroundColor: "#fcfcfc",
  },
  chatView: {
    //width: "90%",
    //height: "88%",
    borderWidth: 1,
    borderColor: "#5781ea",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
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
