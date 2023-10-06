import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import UserModel from "../models/user.model";
import User from "../entities/users/user";
import { CityMapper } from "./city.mapper";

export class UserMapper implements MapperMarker {
    static getModel(entity: User): UserModel {
        return {
            id: entity.id,
            full_name: entity.full_name,
            username: entity.username,
            city: CityMapper.getModel(entity.city),
            description: entity.description,
            profile_picture: entity.profile_picture,
            header_picture: entity.header_picture,
            email: entity.email,
            password: entity.password,
            role: entity.role,
            created_at: entity.created_at,
            updated_at: entity.updated_at,
            deleted_at: entity.deleted_at,
        }
    }
}