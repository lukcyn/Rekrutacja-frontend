import { RecruitmentDTO, RecruitmentPaginationParams, RecruitmentRequest, RecruitmentShortDTO } from "@/types/Recruitment";
import { axiosPrivate } from "./axios";
import { Page } from "@/types/Page";



export const fetchRecruitment = async (params: RecruitmentPaginationParams): Promise<Page<RecruitmentShortDTO>> => {
    try {
        const response = await axiosPrivate.get('/recruitment', { params: { ...params } });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const deleteRecruitment = async (id: number): Promise<void> => {
    try {
        const response = await axiosPrivate.delete(`/recruitment/${id}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchRecruitmentById = async (id: number): Promise<RecruitmentDTO> => {
    try {
        const response = await axiosPrivate.get(`/recruitment/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateRecruitment = async (id: number, recruitment: RecruitmentRequest): Promise<void> => {
    try {
        console.log("Request at", "/recruitment/" + id, "with", recruitment, "body")
        const response = await axiosPrivate.put(`/recruitment/${id}`, recruitment);
    } catch (error) {
        console.error(error);
        throw error;
    }
}