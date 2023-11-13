import { IsNotEmpty, IsString, IsEnum, MaxLength } from 'class-validator';
import { ResponseAttr } from './response';
import UUID from 'src/@core/shared/domain/value-objects/uuid.vo';
import EntityPropsValidation from 'src/@core/shared/domain/entities/entity-props-validation';
import { EvaluationResponse } from 'src/@core/shared/domain/enums/evaluation-response.enum';

export class ResponseProps extends EntityPropsValidation {
  @IsNotEmpty()
  id: UUID;

  @IsNotEmpty()
  id_question: UUID;

  @IsNotEmpty()
  id_adopt: UUID;

  @IsEnum(EvaluationResponse)
  @IsNotEmpty()
  evaluation: EvaluationResponse;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  response: string;

  constructor(props: ResponseAttr) {
    super();
    this.id = new UUID(props.id);
    this.id_adopt = new UUID(props.id_adopt);
    this.id_question = new UUID(props.id_question);
    this.evaluation = props.evaluation;
    this.response = props.response;

    this.validate(this);
  }
}
