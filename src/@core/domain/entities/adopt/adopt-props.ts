import EntityProps from 'src/@core/shared/domain/entities/entity-props';
import { IsNotEmpty, IsString, IsEnum, MaxLength, IsNumber } from 'class-validator';
import { AdoptAttr } from './adopt';
import UUID from 'src/@core/shared/domain/value-objects/uuid.vo';
import { StatusAdopt } from 'src/@core/shared/domain/enums/status_adopt.enum';

export default class AdoptProps extends EntityProps {
  @IsNotEmpty()
  id_adopter: UUID;

  @IsNotEmpty()
  id_post: UUID;

  @IsNotEmpty()
  id_response_quiz: UUID;

  @IsEnum(StatusAdopt)
  @IsNotEmpty()
  status: StatusAdopt;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  feedback_poster: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  feedback_godfather: string;

  @IsNumber()
  @IsNotEmpty()
  punctuation: number;


  constructor(props: AdoptAttr) {
    super(props.id, props.created_at, props.updated_at, props.deleted_at);
    this.id_adopter = new UUID(props.id_adopter);
    this.id_post = new UUID(props.id_post);
    this.id_response_quiz = new UUID(props.id_response_quiz);
    this.status = props.status;
    this.feedback_godfather = props.feedback_godfather ?? '';
    this.feedback_poster = props.feedback_poster ?? '';
    this.punctuation = props.punctuation ?? 0.0;

    this.validate(this);
  }
}
