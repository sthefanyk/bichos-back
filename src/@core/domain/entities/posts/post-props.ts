import EntityProps from "src/@core/shared/domain/entities/entity-props";
import { PostAttr } from "./post";
import { StatusPost } from "src/@core/shared/domain/enums/status_post_adopt.enum";
import { TypePost } from "src/@core/shared/domain/enums/type_post.enum";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Animal } from "./animal";
import { Contact } from "../contact";

export class PostProps extends EntityProps {

    @IsBoolean()
    @IsNotEmpty()
    urgent: boolean;

    @MaxLength(255)
    @IsString()
    @IsOptional()
    urgency_justification: string;
    
    @IsString()
    @IsNotEmpty()
    posted_by: string;

    @IsNumber()
    @IsNotEmpty()
    renewal_count: number;

    @IsEnum(StatusPost)
    @IsNotEmpty()
    status: StatusPost;
    
    @IsEnum(TypePost)
    @IsNotEmpty()
    type: TypePost;

    @IsNotEmpty()
    animal: Animal;

    @IsNotEmpty()
    contact: Contact;

    constructor(props: PostAttr){
        super(props.id, props.created_at, props.updated_at, props.deleted_at);
        this.urgent = props.urgent;
        this.urgency_justification = props.urgency_justification;
        this.posted_by = props.posted_by.getIdString();
        this.renewal_count = props.renewal_count;
        this.status = props.status;
        this.type = props.type;
        this.animal = props.animal;
        this.contact = props.contact;

        this.validate(this);
    }

}