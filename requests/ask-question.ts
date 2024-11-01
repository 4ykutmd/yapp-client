import axios from "axios";

export async function AskQuestionRequest({ soru }: { soru: string }) {
    try {

        const res = await axios.get(`http://192.168.1.3:3000/gecici?soru=${soru}`);

        return res.data;
        
    } catch (error) {
        console.error(error);
        return null;
    }
  
}
