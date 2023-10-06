import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import NGO from "../entities/users/ngo";
import NGOModel from "../models/ngo.model";
import UserModel from "../models/user.model";
import { UserMapper } from "./user.mapper";
import { CityMapper } from "./city.mapper";

export class NGOMapper implements MapperMarker {
    static getEntity(ngoModel: NGOModel) : NGO {
        return new NGO({
            cnpj: ngoModel.cnpj,
            name_ngo: ngoModel.name_ngo,
            date_register: ngoModel.date_register,
            userAttr: {
                id: ngoModel.user.id,
                full_name: ngoModel.user.full_name,
                username: ngoModel.user.username,
                email: ngoModel.user.email,
                password: ngoModel.user.password,
                city: CityMapper.getEntity(ngoModel.user.city),
                role: +ngoModel.user.role,
                description: ngoModel.user.description,
                profile_picture: ngoModel.user.profile_picture,
                header_picture: ngoModel.user.header_picture,
                created_at: ngoModel.user.created_at,
                updated_at: ngoModel.user.updated_at,
                deleted_at: ngoModel.user.deleted_at,
            }
        });
    }

    static getModel(entity: NGO) : NGOModel {
        const user : UserModel = UserMapper.getModel(entity);

        return {
            id: user.id,
            cnpj: entity.cnpj,
            name_ngo: entity.name_ngo,
            date_register: entity.date_register,
            user,
        };
    }

    static getJsonWithModel(model: NGOModel) {
        return {
            cnpj: model.cnpj,
            name_ngo: model.name_ngo,
            date_register: model.date_register,
            id: model.id,
            full_name: model.user.full_name,
            username: model.user.username,
            email: model.user.email,
            password: model.user.password,
            description: model.user.description,
            profile_picture: model.user.profile_picture,
            header_picture: model.user.header_picture,
            city_name: model.user.city.name,
            state_name: model.user.city.state.name,
            state_abbreviation: model.user.city.state.abbreviation,
            role: model.user.role,
            created_at: model.user.created_at,
            updated_at: model.user.updated_at,
            deleted_at: model.user.deleted_at
        }
    }

    static getJsonWithEntity(entity: NGO) {
        return NGOMapper.getJsonWithModel(
            NGOMapper.getModel(entity)
        );
    }

    static getEntityWithJsonData(data: {
        cnpj: string;
        name_ngo: string;
        date_register: string;
        id: string;
        full_name: string;
        username: string;
        email: string;
        password: string;
        description: string;
        profile_picture: string;
        header_picture: string;
        city_name: string;
        state_name: string;
        abbreviation: string;
        role: string;
        created_at: string;
        updated_at: string;
        deleted_at: string
    }) : NGO {
        return new NGO({
            cnpj: data.cnpj,
            name_ngo: data.name_ngo,
            date_register: new Date(data.date_register),
            userAttr: {
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
                profile_picture: data.profile_picture,
                header_picture: data.header_picture,
                created_at: data.created_at ? new Date(data.created_at) : null,
                updated_at: data.updated_at ? new Date(data.updated_at) : null,
                deleted_at: data.deleted_at ? new Date(data.deleted_at) : null,
            }
        });
    }    
}