import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import UserModel from "../models/user.model";
import User from "../entities/users/user";
import { CityMapper } from "./city.mapper";

export class UserMapper implements MapperMarker {
    static getModel(entity: User): UserModel {
        const props = entity.getProps();
        return {
            id: props.id.toString(),
            fullName: props.fullName,
            username: props.username,
            city: CityMapper.getModel(props.city),
            description: props.description,
            email: props.email,
            password: props.password,
            role: props.role,
            created_at: props.created_at,
            updated_at: props.updated_at,
            deleted_at: props.deleted_at,
        }
    }
}