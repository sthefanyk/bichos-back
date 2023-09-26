import { City } from "../../domain/entities/localization/city";
import { Role } from "../../shared/domain/enums/role.enum";

export type PersonUpdateInputDto = {
    id: string;
    cpf: string;
    date_birth: Date;
    full_name: string;
    username: string;
    email: string;
    password: string;
    city: City;
    description?: string;
    profile_picture?: string;
    header_picture?: string;
}

export type PersonOutputDto = {
    cpf: string;
    date_birth: Date;
    full_name: string;
    username: string;
    email: string;
    password: string;
    city: City;
    role: Role;
    description: string;
    profile_picture: string;
    header_picture: string;
    id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}