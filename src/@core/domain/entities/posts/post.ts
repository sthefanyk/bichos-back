import Entity from "src/@core/shared/domain/entities/entity";
import { PostProps } from "./post-props";
import { StatusPost } from "src/@core/shared/domain/enums/status_post.enum";
import { TypePost } from "src/@core/shared/domain/enums/type_post.enum";
import UUID from "src/@core/shared/domain/value-objects/uuid.vo";

export type PostAttr = {
    urgent: boolean;
    posted_by: UUID;
    renewal_count?: number;
    status?: StatusPost;
    type: TypePost;
    urgency_justification?: string;

    id?: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
}

export class Post extends Entity<PostProps> {
    constructor(private postProps: PostAttr) {
        postProps.renewal_count = 0;
        postProps.status = StatusPost.WAITING_QUESTIONNAIRES;
        const props = new PostProps(postProps);
        super(props);
    }
}