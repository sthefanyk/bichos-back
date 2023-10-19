import { City } from "../../domain/entities/localization/city";
import { Role } from "../../shared/domain/enums/role.enum";

export type ShelterUpdateInputDto = {
    id: string;
    responsible_cpf: string;
    responsible_date_birth: Date;
    name_shelter: string;
    star_date_shelter: Date;
    full_name: string;
    username: string;
    name: string;
    email: string;
    password: string;
    city: City;
    description?: string;
    profile_picture?: string;
    header_picture?: string;
}

export type ShelterOutputDto = {
    responsible_cpf: string;
    responsible_date_birth: Date;
    name_shelter: string;
    star_date_shelter: Date;
    full_name: string;
    username: string;
    name: string;
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