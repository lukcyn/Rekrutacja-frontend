import { RecruitmentPaginationParams, RecruitmentShortDTO } from "@/types/Recruitment";
import { axiosPrivate } from "./axios";
import { Page, Pageable } from "@/types/Page";



export const fetchRecruitment = async (params: RecruitmentPaginationParams): Promise<Page<RecruitmentShortDTO>> => {
    try {
        const response = await axiosPrivate.get('/recruitment', { params: { ...params } });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};