
import { AppUserRole } from "@/enums/role"

export interface AppUserDTO {
    id: number;
    name: string;
    pesel: string;
    surname: string;
    login: string;
    email: string;
    role: AppUserRole;
    isEnabled: boolean;
    dateOfBirth: string;
}

export interface AppUserParams {
    name: string;
    surname: string;

    
}