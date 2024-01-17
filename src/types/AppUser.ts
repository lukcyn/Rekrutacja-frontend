import { AppUserRole } from "@/enums/role"

export interface AppUserDTO {
    id: number;
    name: string;
    surname: string;
    email: string;
    role: AppUserRole;
}