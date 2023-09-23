import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import Person from "../entities/users/person";
import PersonModel from "../models/person.model";
import CPF from "src/@core/shared/domain/value-objects/cpf.vo";
import UserModel from "../models/user.model";
import { UserMapper } from "./user.mapper";
import { CityMapper } from "./city.mapper";

export class PersonMapper implements MapperMarker {
    static getEntity(personModel: PersonModel) : Person {
        return new Person({
            cpf: personModel.cpf,
            date_birth: new Date(personModel.date_birth)
        }, {
            id: personModel.user.id,
            fullName: personModel.user.fullName,
            username: personModel.user.username,
            email: personModel.user.email,
            password: personModel.user.password,
            city: CityMapper.getEntity(personModel.user.city),
            role: +personModel.user.role,
            description: personModel.user.description,
            created_at: personModel.user.created_at,
            updated_at: personModel.user.updated_at,
            deleted_at: personModel.user.deleted_at,
        });
    }

    static getModel(entity: Person) : PersonModel {
        const user : UserModel = UserMapper.getModel(entity);

        return {
            id: user.id,
            cpf: entity.cpf instanceof CPF ? entity.cpf.value : entity.cpf,
            date_birth: entity.date_birth,
            user,
        };
    }

    // static getUser(entity: Person) : UserModel {
    //     const props = entity.getProps();
    //     return {
    //         id: props.id.toString(),
    //         fullName: props.fullName,
    //         username: props.username,
    //         city: props.city,
    //         description: props.description,
    //         email: props.email,
    //         password: props.password,
    //         role: props.role,
    //         created_at: props.created_at,
    //         updated_at: props.updated_at,
    //         deleted_at: props.deleted_at, 
    //     } as any;
    // }

    // static getPerson(entity: Person) : PersonModel {
    //     const props = entity.getProps();
    //     return {
    //         id: props.id.toString(),
    //         cpf: entity.cpf,
    //         date_birth: entity.date_birth,
    //     } as any;
    // }

    
}