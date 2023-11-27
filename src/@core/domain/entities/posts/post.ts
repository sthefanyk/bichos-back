import { TypePost } from "src/@core/shared/domain/enums/type_post.enum";
import { Animal } from "./animal";
import { EntityMarker } from "src/@core/shared/domain/markers/entity.marker";
import { PostProps } from "./post-props";
import { Contact } from "../contact";
import User from "../users/user";

const PhotosConfig = [
  { name: 'main_photo', maxCount: 1 },
  { name: 'second_photo', maxCount: 1 },
  { name: 'third_photo', maxCount: 1 },
  { name: 'fourth_photo', maxCount: 1 },
];

export default PhotosConfig;

export type PostAttr = {
    urgent: boolean;
    posted_by: User;
    renewal_count?: number;
    latest_status_update?: Date;
    type: TypePost;
    urgency_justification?: string;
    animal: Animal;
    contact: Contact;

    id?: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
}

export class Post implements EntityMarker {

    private postProps: PostProps;

    constructor(postAttr: PostAttr) {
        this.postProps = new PostProps(postAttr);
    }

    toJson() {
        return { 
            ...this.postProps,
            id: this.id,
            posted_by: this.posted_by.toJson(),
            contact: this.contact.toJson(),
            animal: this.postProps.animal.toJson(),
        };
    }

    public inactivate() {
        this.postProps.deleted_at = new Date();
    }

    public setLatestStatusUpdate() {
        this.postProps.latest_status_update = new Date();
    }

    get contact(): Contact {
        return this.postProps.contact;  
    }

    get urgent(): boolean {
        return this.postProps.urgent;  
    }

    get posted_by(): User {
        return this.postProps.posted_by; 
    }

    get renewal_count(): number {
        return this.postProps.renewal_count; 
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

    get latest_status_update(): Date {
        return this.postProps.latest_status_update;
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