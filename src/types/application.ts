
export interface ApplicationInfoDTO {
    id: number,
    firstname: string,
    lastname: string,
    fieldOfStudyName: string,
    preferencesNumber: number,
    applicationStatus: string,
    recruitmentIndicator: number
}

export interface ApplicationDTO {
    id?: number,
    recruitmentIndicator?: number,
    preferencesNumber: number,
    applicationStatus?: string,
    fieldOfStudy: string
}