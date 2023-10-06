import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import Person from "../entities/users/person";
import PersonModel from "../models/person.model";
import UserModel from "../models/user.model";
import { UserMapper } from "./user.mapper";
import { CityMapper } from "./city.mapper";

export class PersonMapper implements MapperMarker {
    static getEntity(personModel: PersonModel) : Person {
        return new Person({
            cpf: personModel.cpf,
            date_birth: new Date(personModel.date_birth),
            userAttr: {
                id: personModel.user.id,
                full_name: personModel.user.full_name,
                username: personModel.user.username,
                email: personModel.user.email,
                password: personModel.user.password,
                city: CityMapper.getEntity(personModel.user.city),
                role: +personModel.user.role,
                description: personModel.user.description,
                profile_picture: personModel.user.profile_picture,
                header_picture: personModel.user.header_picture,
                created_at: personModel.user.created_at,
                updated_at: personModel.user.updated_at,
                deleted_at: personModel.user.deleted_at,
            }
        });
    }

    static getModel(entity: Person) : PersonModel {
        const user : UserModel = UserMapper.getModel(entity);

        return {
            id: user.id,
            cpf: entity.cpf,
            date_birth: entity.date_birth,
            user,
        };
    }

    static getJsonWithModel(model: PersonModel) {
        return {
            cpf: model.cpf,
            date_birth: model.date_birth,
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

    static getJsonWithEntity(entity: Person) {
        return PersonMapper.getJsonWithModel(
            PersonMapper.getModel(entity)
        );
    }

    static getEntityWithJsonData(data: {
        cpf: string;
        date_birth: string;
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
    }) : Person {
        return new Person({
            cpf: data.cpf,
            date_birth: new Date(data.date_birth),
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