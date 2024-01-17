export interface ChatParticipantDTO {
    id: number;
    name: string;
    surname: string;
}

export interface MessageDTO {
    id: number;
    receiverId: number;
    senderId: number;
    content: string;
    createdAt: string;
}

export interface MessageContentDTO {
    content: string;
}