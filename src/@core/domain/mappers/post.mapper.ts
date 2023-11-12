import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import { Post } from "../entities/posts/post";
import PostModel from "../models/post.model";
import UserModel from "../models/user.model";
import { AnimalMapper } from "./animal.mapper";
import { CityMapper } from "./city.mapper";

export class PostMapper implements MapperMarker {
    static getModel(entity: Post, user: UserModel) : PostModel {
        return {
            id: entity.id,
            urgent: entity.urgent,
            urgency_justification: entity.urgency_justification,
            posted_by: user,
            renewal_count: entity.renewal_count,
            status: entity.status,
            type: entity.type,
            animal: AnimalMapper.getModel(entity.animal),
            contact_name: entity.contact.name,
            contact_email: entity.contact.email,
            contact_phone: entity.contact.phone,
            contact_city: CityMapper.getModel(entity.contact.city),
            created_at: entity.created_at,
            updated_at: entity.updated_at,
            deleted_at: entity.deleted_at
        }
    }
}