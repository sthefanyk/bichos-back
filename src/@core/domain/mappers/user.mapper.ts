import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import UserModel from "../models/user.model";
import User from "../entities/users/user";
import { CityMapper } from "./city.mapper";

export class UserMapper implements MapperMarker {
    static getModel(entity: User): UserModel {
        const props = entity.getProps();
        return {
            id: props.id.getIdString(),
            full_name: props.full_name,
            username: props.username,
            city: CityMapper.getModel(props.city),
            description: props.description,
            profile_picture: props.profile_picture,
            header_picture: props.header_picture,
            email: props.email,
            password: props.password,
            role: props.role,
            created_at: props.created_at,
            updated_at: props.updated_at,
            deleted_at: props.deleted_at,
        }
    }
}