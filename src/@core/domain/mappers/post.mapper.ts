import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import { Post } from "../entities/posts/post";
import PostModel from "../models/post.model";
import UserModel from "../models/user.model";
import { AnimalMapper } from "./animal.mapper";

export class PostMapper implements MapperMarker {
    static getModel(entity: Post, user: UserModel) : PostModel {
        const props = entity.getProps();
        return {
            id: props.id.getIdString(),
            urgent: props.urgent,
            urgency_justification: props.urgency_justification,
            posted_by: user,
            renewal_count: props.renewal_count,
            status: props.status,
            type: props.type,
            animal: AnimalMapper.getModel(props.animal),
            created_at: props.created_at,
            updated_at: props.updated_at,
            deleted_at: props.deleted_at
        }
    }
}