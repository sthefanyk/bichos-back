import EntityProps from 'src/@core/shared/domain/entities/entity-props';
import { PostAttr } from './post';
import { TypePost } from 'src/@core/shared/domain/enums/type_post.enum';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Animal } from './animal';
import { Contact } from '../contact';
import User from '../users/user';

export class PostProps extends EntityProps {
  @IsBoolean()
  @IsNotEmpty()
  urgent: boolean;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  urgency_justification: string;

  posted_by: User;

  @IsNumber()
  renewal_count: number;

  @IsEnum(TypePost)
  @IsNotEmpty()
  type: TypePost;

  @IsNotEmpty()
  animal: Animal;

  @IsNotEmpty()
  contact: Contact;

  latest_status_update: Date;

  constructor(props: PostAttr) {
    super(props.id, props.created_at, props.updated_at, props.deleted_at);
    this.urgent = props.urgent;
    this.urgency_justification = props.urgency_justification;
    this.posted_by = props.posted_by;
    this.renewal_count = props.renewal_count ?? 0;
    this.type = props.type;
    this.animal = props.animal;
    this.contact = props.contact;
    this.latest_status_update = props.latest_status_update ?? new Date();

    this.validate(this);
  }
}
