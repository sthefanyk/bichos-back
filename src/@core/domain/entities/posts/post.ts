import { StatusPost } from "src/@core/shared/domain/enums/status_post.enum";
import { TypePost } from "src/@core/shared/domain/enums/type_post.enum";
import UUID from "src/@core/shared/domain/value-objects/uuid.vo";
import { Animal } from "./animal";
import { InvalidStatusError } from "src/@core/shared/domain/errors/invalid-status";
import { EntityMarker } from "src/@core/shared/domain/markers/entity.marker";
import { PostProps } from "./post-props";

export type PostAttr = {
    urgent: boolean;
    posted_by: UUID;
    renewal_count?: number;
    status?: StatusPost;
    type: TypePost;
    urgency_justification?: string;
    animal: Animal;

    id?: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
}

export class Post implements EntityMarker {

    private postProps: PostProps;

    constructor(private postAttr: PostAttr) {
        postAttr.renewal_count = postAttr.renewal_count ?? 0;
        postAttr.status = postAttr.status ?? StatusPost.WAITING_QUESTIONNAIRES;

        this.postProps = new PostProps(postAttr);
        this.postProps.validate(this.postProps);
    }

    toJson() {
        return { ...this.postProps }
    }

    public inactivate(status: StatusPost) {

        if (
            status !== StatusPost.CLOSED_BY_POSTER &&
            status !== StatusPost.TIME_CLOSURE &&
            status !== StatusPost.PROCESS_COMPLETED
        ) {
            throw new InvalidStatusError('This status is invalid for deactivation');
        }

        this.postProps.status = status;
        this.postProps.deleted_at = new Date();
    }


    get urgent(): boolean {
        return this.postProps.urgent;  
    }

    get posted_by(): string {
        return this.postProps.posted_by; 
    }

    get renewal_count(): number {
        return this.postProps.renewal_count; 
    }

    get status(): StatusPost {
        return this.postProps.status;   
    }

    get type(): TypePost {
        return this.postProps.type;   
    }

    get urgency_justification(): string {
        return this.postProps.urgency_justification;   
    }

    get animal(): Animal {
        return this.postProps.animal;   
    }

    get id(): string {
        return this.postProps.id.getIdString();   
    }

    get created_at(): Date {
        return this.postProps.created_at;   
    }

    get updated_at(): Date {
        return this.postProps.updated_at;
    }

    get deleted_at(): Date {
        return this.postProps.deleted_at;  
    }
}