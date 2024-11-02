import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useRef, useState } from "react";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
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
import { Image } from "expo-image";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

export default function Page() {
  const [image, setImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [lastImage, setLastImage] = useState<{
    fileUri: string;
    mimeType: string;
  } | null>(null);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const launchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const launchLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
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
          lastImage !== null ? {
            fileData: {
              mimeType: lastImage.mimeType,
              fileUri: lastImage.fileUri,
            },
          } : null,
        ],
      };
    }).reverse();
    let remove_null_in_parts = history.map((message) => {
      return {
        role: message.role,
        parts: message.parts.filter((part) => part !== null),
      };
    });
    let res = await ChatRequest({ message: text, history: remove_null_in_parts, fileUri: image });
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
        image: image,
      }
    }
    let newMessages = [newMessage, myMessage];
    setMessages([...newMessages, ...messages]);

    if (res.have_file) {
      setLastImage({
        fileUri: res.file.fileUri,
        mimeType: res.file.mimeType,
      })
    } else {
      setLastImage(null);
    }

    //setImage(null);
  };

  return (
    <View style={styles.main}>
      <GiftedChat
        messagesContainerStyle={styles.chatView}
        user={{
          _id: 1,
        }}
        //@ts-ignore
        messages={messages.map((message) => {
          return {
            _id: message.id,
            text: message.parts.text,
            image: message.parts.image,
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
          if (image) setImage(null);
          console.log(newMessages);
          questionRequest(newMessages[0].text);
        }}
        //render
        renderChatEmpty={() => <Text>Bir şeyler sor...</Text>}
        renderBubble={(props) => (
          <MessageBox
            direction={props.currentMessage?.user?._id === 1 ? "right" : "left"}
            text={props.currentMessage?.text}
            image={props.currentMessage?.image}
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
          <View>
            {
              image && <View style={styles.imageView}>
                <Pressable
                style={styles.imageRemoveButton}
                onPress={() => setImage(null)}
                >
                  <Feather name="x" size={15} color="white" />
                </Pressable>
                <Image
                  source={{uri: image}}
                  style={styles.image}
                  contentFit="contain"
                />
              </View>
            }
            <View style={{ flexDirection: "row", gap: 5, width: '94%'}}>
              <Pressable onPress={handlePresentModalPress} style={styles.button}>
                <Ionicons name="attach" size={24} color="white" />
              </Pressable>
              <InputToolbar {...props} containerStyle={{backgroundColor: 'transparent', width: '87%'}} />
            </View>
          </View>
        )}
        renderAvatar={() => null}
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['20%']}
      >
        <BottomSheetView style={styles.bottomSheetContainer}>
          <View style={styles.buttonsView}>
            <Pressable
            style={styles.bottomSheetButtons}
            onPress={() => {
              handleCloseModalPress();
              launchLibrary();
            }}
            >
              <FontAwesome name="picture-o" size={24} color="white" />
            </Pressable>
            <Text style={styles.buttonsText}>
              {"Galeriden\nSeç"}
            </Text>
          </View>
          <View style={styles.buttonsView}>
            <Pressable
            style={styles.bottomSheetButtons}
            onPress={() => {
              handleCloseModalPress();
              launchCamera();
            }}
            >
              <FontAwesome name="camera" size={24} color="white" />
            </Pressable>
            <Text style={styles.buttonsText}>
              {"Resim\nÇek"}
            </Text>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
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
  input: {
    width: "65%",
    height: 50,
    borderRadius: 30,
    padding: 10,
    paddingLeft: 15,
    marginRight: 10,
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
  imageView: {
    backgroundColor: '#fff',
    width: 150,
    height: 150,
    marginBottom: 10,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 7,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  imageRemoveButton: {
    width: 20,
    height: 20,
    position: 'absolute',
    zIndex: 99,
    backgroundColor: 'red',
    borderRadius: 100,
    right: -10,
    top: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetContainer: {
    //flex: 1,
    flexDirection: "row",
    backgroundColor: "#efefef",
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "#e0e0e0",
    borderTopWidth: 2,
    gap: 30,
    paddingVertical: '5%',
  },
  bottomSheetButtons: {
    width: 50,
    height: 50,
    backgroundColor: "#5781ea",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsText: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "500",
  },
  buttonsView: {
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
  }
});
