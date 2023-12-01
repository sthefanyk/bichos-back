import EntityPropsValidation from 'src/@core/shared/domain/entities/entity-props-validation';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { AlternativeAttr } from './alternative';
import UUID from 'src/@core/shared/domain/value-objects/uuid.vo';

export default class QuizProps extends EntityPropsValidation {
  id: UUID;

  @Length(2, 255)
  @IsString()
  @IsNotEmpty()
  alternative: string;

  constructor(props: AlternativeAttr) {
    super();
    this.id = props.id ? new UUID(props.id) : new UUID();
    this.alternative = props.alternative.toLowerCase();

    this.validate(this);
  }
}
