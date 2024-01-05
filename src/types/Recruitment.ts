import { FieldOfStudyDTO } from "./FieldOfStudy";
import { SpecializationDTO } from "./Specialization";

export interface RecruitmentDTO {
    id: number;
    cycle: string;
    startDate: string;
    endDate: string;
    capacity: number;
    fieldOfStudy: FieldOfStudyDTO;
    specialization: SpecializationDTO;
}

export interface RecruitmentShortDTO {
    recruitmentId: number;
    title: string;
}

export interface RecruitmentPaginationParams {
    pageNumber: number;
    size: number;
    search: string;
    sortBy?: string;
    sortDirection?: string;
}