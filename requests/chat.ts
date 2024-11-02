import axios from "axios";

type HistoryType = {
    role: "user" | "model",
    parts: {
        text: string
    }[]
}[]

export async function ChatRequest({ message, history }: { message: string, history: HistoryType }) {
    try {
        //console.log(history)
        const res = await axios.post("http://192.168.1.113:3000/api/chat", {
            prompt: message,
            history: history
        });

        return res.data;
        
    } catch (error) {
        console.error(error);
        return null;
    }
  
}
