import EntityProps from 'src/@core/shared/domain/entities/entity-props';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { QuestionAttr } from './question';
import { QuestionTypes } from 'src/@core/shared/domain/enums/question-types.enum';
import { Alternative } from './alternative';
import { EntityValidationError } from 'src/@core/shared/domain/errors/validation.error';

export default class QuestionProps extends EntityProps {
  @Length(2, 255)
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsEnum(QuestionTypes)
  @IsNotEmpty()
  type: QuestionTypes;

  @IsBoolean()
  @IsNotEmpty()
  others: boolean;

  alternatives: Alternative[];

  constructor(props: QuestionAttr) {
    super(props.id, props.created_at, props.updated_at, props.deleted_at);
    this.question = props.question;
    this.type = props.type;
    this.others = props.others;
    this.alternatives = props.alternatives;

    this.validate(this);

    if (this.type === QuestionTypes.ALTERNATIVE && this.alternatives.length < 2) {
      throw new EntityValidationError('Alternative questions must have at least 2 alternatives');
    }

    if (this.type === QuestionTypes.DESCRIPTIVE && this.alternatives.length !== 0) {
      throw new EntityValidationError('Descriptive questions cannot have alternatives');
    }
  }
}
