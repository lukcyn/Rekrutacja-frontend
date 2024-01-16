import { ChatParticipantDTO, MessageContentDTO, MessageDTO } from "@/types/Chat";
import { axiosPrivate } from "./axios";
import { Page } from "@/types/Page";

export const getChattersWithUser = async (): Promise<Page<ChatParticipantDTO>> => {
    try {
        const response = await axiosPrivate.get(`/chat/chatting-with`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getMessagesWithUser = async (userId: number): Promise<Page<MessageDTO>> => {
    try {
        const response = await axiosPrivate.get(`/chat/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const sendMessage = async (userId: number, message: MessageContentDTO): Promise<void> => {
    try {
        const response = await axiosPrivate.post(`/chat/${userId}`, message);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
