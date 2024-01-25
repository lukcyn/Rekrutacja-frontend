import {axiosPrivate} from "./axios";
import {PaginationParams} from "@/types/Page";
import {AppUserDTO} from "@/types/AppUser";


export const fetchAppUsersByNameAndSurname = async (params: PaginationParams, name: string | null, surname: string | null): Promise<AppUserDTO[]> => {
    try {
        const response = await axiosPrivate.get('/userdata/users', {
            params: {
                name:name,
                surname:surname
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const fetchAppUserById = async (id: number): Promise<AppUserDTO> => {
    try {
        const response = await axiosPrivate.get('/userdata/users/' +id);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

