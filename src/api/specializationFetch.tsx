import { Page, PaginationParams } from "@/types/Page";
import { axiosPrivate } from "./axios";
import { FieldOfStudyDTO } from "@/types/FieldOfStudy";


export const fetchSpecializations = async (params: PaginationParams, fieldOfStudyId: number): Promise<Page<FieldOfStudyDTO>> => {
    try {
        const response = await axiosPrivate.get(`/field-of-study/${fieldOfStudyId}/specialization`, { params: { ...params } });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};