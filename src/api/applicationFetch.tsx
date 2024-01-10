import { ApplicationDTO } from "@/types/application";
import { axiosPrivate } from "./axios";

export const addApplication = async (application: ApplicationDTO): Promise<ApplicationDTO> => {
    try{
        const response = await axiosPrivate.post('/application/add', application)
        return response.data
    } catch(error) {
        console.log(error)
        throw error
    }
}