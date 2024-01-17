import { AppUserDTO } from "@/types/AppUser";
import { axiosPrivate } from "./axios";

export const getUserData = async (): Promise<AppUserDTO> => {
    try {
        const response = await axiosPrivate.get("/user");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}