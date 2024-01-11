import { ApplicationDTO, ApplicationInfoDTO } from "@/types/application";
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

export const getPreferencesNumbers = async (): Promise<number[]> => {
    try {
        const response = await axiosPrivate.get('/application/preferences')
        return response.data
    } catch(error) {
        throw error
    }
}

export const getApplications = async (): Promise<ApplicationInfoDTO[]> => {
    try {
        const response = await axiosPrivate.get('/application')
        return response.data
    } catch(error) {
        console.log(error)
        throw error
    }
}