export type MessageData = {
    id: string | number;
    role: "user" | "model";
    createdAt: Date;
    parts: {
        text: string;
        image: string | null;
    },
}

export type ChatData = {
    id: number;
    updatedAt: Date;
    messages: MessageData[];
}