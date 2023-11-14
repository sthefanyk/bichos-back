import EntityProps from 'src/@core/shared/domain/entities/entity-props';
import { IsNotEmpty, IsString, IsEnum, MaxLength, IsOptional } from 'class-validator';
import { SponsorshipAttr } from './sponsorship';
import UUID from 'src/@core/shared/domain/value-objects/uuid.vo';
import { StatusSponsorship } from 'src/@core/shared/domain/enums/status_sponsorship.enum';

export default class SponsorshipProps extends EntityProps {

  @IsNotEmpty()
  id_godfather: UUID;

  @IsNotEmpty()
  id_post: UUID;

  @IsEnum(StatusSponsorship)
  @IsNotEmpty()
  status: StatusSponsorship;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  feedback_poster: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  feedback_godfather: string;

  constructor(props: SponsorshipAttr) {
    super(props.id, props.created_at, props.updated_at, props.deleted_at);
    this.id_godfather = new UUID(props.id_godfather);
    this.id_post = new UUID(props.id_post);
    this.status = props.status ?? StatusSponsorship.IN_PROCESS;
    this.feedback_godfather = props.feedback_godfather ?? '';
    this.feedback_poster = props.feedback_poster ?? '';

    this.validate(this);
  }
}
