import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import Shelter from "../entities/users/shelter";
import ShelterModel from "../models/shelter.model";
import UserModel from "../models/user.model";
import { UserMapper } from "./user.mapper";
import { CityMapper } from "./city.mapper";

export class ShelterMapper implements MapperMarker {
    static getEntity(shelterModel: ShelterModel) : Shelter {
        return new Shelter({
            responsible_cpf: shelterModel.responsible_cpf,
            responsible_date_birth: new Date(shelterModel.responsible_date_birth),
            name_shelter: shelterModel.name_shelter,
            star_date_shelter: new Date(shelterModel.star_date_shelter),
        }, {
            id: shelterModel.user.id,
            full_name: shelterModel.user.full_name,
            username: shelterModel.user.username,
            email: shelterModel.user.email,
            password: shelterModel.user.password,
            city: CityMapper.getEntity(shelterModel.user.city),
            role: +shelterModel.user.role,
            description: shelterModel.user.description,
            created_at: shelterModel.user.created_at,
            updated_at: shelterModel.user.updated_at,
            deleted_at: shelterModel.user.deleted_at,
        });
    }

    static getModel(entity: Shelter) : ShelterModel {
        const user : UserModel = UserMapper.getModel(entity);

        return {
            id: user.id,
            responsible_cpf: entity.responsible_cpf,
            responsible_date_birth: entity.responsible_date_birth,
            name_shelter: entity.name_shelter,
            star_date_shelter: entity.star_date_shelter,
            user,
        };
    }

    static getJsonWithModel(model: ShelterModel) {
        return {
            responsible_cpf: model.responsible_cpf,
            responsible_date_birth: model.responsible_date_birth,
            name_shelter: model.name_shelter,
            star_date_shelter: model.star_date_shelter,
            id: model.id,
            full_name: model.user.full_name,
            username: model.user.username,
            email: model.user.email,
            password: model.user.password,
            description: model.user.description,
            city_name: model.user.city.name,
            state_name: model.user.city.state.name,
            state_abbreviation: model.user.city.state.abbreviation,
            role: model.user.role,
            created_at: model.user.created_at,
            updated_at: model.user.updated_at,
            deleted_at: model.user.deleted_at
        }
    }

    static getJsonWithEntity(entity: Shelter) {
        return ShelterMapper.getJsonWithModel(
            ShelterMapper.getModel(entity)
        );
    }

    static getEntityWithJsonData(data: {
        responsible_cpf: string;
        responsible_date_birth: string;
        name_shelter: string;
        star_date_shelter: string;
        id: string;
        full_name: string;
        username: string;
        email: string;
        password: string;
        description: string;
        city_name: string;
        state_name: string;
        abbreviation: string;
        role: string;
        created_at: string;
        updated_at: string;
        deleted_at: string
    }) : Shelter {
        return new Shelter({
            responsible_cpf: data.responsible_cpf,
            responsible_date_birth: new Date(data.responsible_date_birth),
            name_shelter: data.name_shelter,
            star_date_shelter: new Date(data.star_date_shelter),
        }, {
            id: data.id,
            full_name: data.full_name,
            username: data.username,
            email: data.email,
            password: data.password,
            city: CityMapper.getEntityWithJsonData({
                name: data.city_name,
                state_name: data.state_name,
                state_abbreviation: data.abbreviation
            }),
            role: +data.role,
            description: data.description,
            created_at: data.created_at ? new Date(data.created_at) : null,
            updated_at: data.updated_at ? new Date(data.updated_at) : null,
            deleted_at: data.deleted_at ? new Date(data.deleted_at) : null,
        });
    }
}