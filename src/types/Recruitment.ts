import { FieldOfStudyDTO } from "./FieldOfStudy";
import { PaginationParams } from "./Page";
import { SpecializationDTO } from "./Specialization";

export interface RecruitmentDTO {
    id: number;
    cycle: string;
    startDate: string;
    endDate: string;
    capacity: number;
    fieldOfStudy: FieldOfStudyDTO;
    specialization?: SpecializationDTO;
    recruitmentThreshold?: number;
}

export interface RecruitmentRequest {
    cycle: string;
    startDate: string;
    endDate: string;
    capacity: number;
    fieldOfStudyId: number;
    specializationId?: number;
}

export interface RecruitmentShortDTO {
    recruitmentId: number;
    title: string;
}

export interface RecruitmentPaginationParams extends PaginationParams {
    search: string;
}