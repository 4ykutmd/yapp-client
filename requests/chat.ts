import axios from "axios";

type HistoryType = {
  role: "user" | "model";
  parts:
    {
        text?: string;
        fileData?: {
          mimeType: string;
          fileUri: string | null;
        };
      }[]
}[];

export async function ChatRequest({
  message,
  history,
  fileUri,
}: {
  message: string;
  history: HistoryType;
  fileUri: string | null;
}) {
  try {
    let bodyFormData = new FormData();
    bodyFormData.append("prompt", message);
    bodyFormData.append("history", JSON.stringify(history));
    if (fileUri) {
      bodyFormData.append("file", {
        uri: fileUri,
        name: fileUri.split("/")[fileUri.split("/").length - 1],
        type: "image/" + fileUri.split(".")[fileUri.split(".").length - 1],
      } as any);
    }
    //console.log(history)
    const res = await axios.post(
      "http://192.168.1.3:3000/api/chat",
      bodyFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
