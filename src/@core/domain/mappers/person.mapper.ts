import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import Person from "../entities/users/person";
import PersonModel from "../models/person.model";
import UserModel from "../models/user.model";

export class PersonMapper implements MapperMarker {
    static getEntity(personModel: PersonModel, userModel: UserModel) : Person {
        return new Person({
            cpf: personModel.cpf,
            date_birth: new Date(personModel.date_birth),
            }, {
                id: userModel.id,
                fullName: userModel.fullName,
                username: userModel.username,
                email: userModel.email,
                password: userModel.password,
                city: userModel.city,
                role: +userModel.role,
                description: userModel.description,
                created_at: userModel.created_at,
                updated_at: userModel.updated_at,
                deleted_at: userModel.deleted_at,
            });
    }

    static getModel(entity: Person) : PersonModel {
        const props = entity.getProps();
        return {
            id: props.id.toString(),
            cpf: entity.cpf,
            fullName: props.fullName,
            username: props.username,
            city: props.city,
            description: props.description,
            date_birth: entity.date_birth,
            email: props.email,
            password: props.password,
            role: props.role,
            created_at: props.created_at,
            updated_at: props.updated_at,
            deleted_at: props.deleted_at, 
        } as any;
    }

    static getUser(entity: Person) : UserModel {
        const props = entity.getProps();
        return {
            id: props.id.toString(),
            fullName: props.fullName,
            username: props.username,
            city: props.city,
            description: props.description,
            email: props.email,
            password: props.password,
            role: props.role,
            created_at: props.created_at,
            updated_at: props.updated_at,
            deleted_at: props.deleted_at, 
        } as any;
    }

    static getPerson(entity: Person) : PersonModel {
        const props = entity.getProps();
        return {
            id: props.id.toString(),
            cpf: entity.cpf,
            date_birth: entity.date_birth,
        } as any;
    }

    
}