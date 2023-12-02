import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { DiseaseAllergyAttr } from './disease-allergy';
import EntityPropsValidation from 'src/@core/shared/domain/entities/entity-props-validation';
import { DiseaseAllergyTypes } from 'src/@core/shared/domain/enums/disease-allergy.enum';
import UUID from 'src/@core/shared/domain/value-objects/uuid.vo';

export class DiseaseAllergyProps extends EntityPropsValidation {
  id: UUID;

  @Length(2, 45)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Length(2, 255)
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(DiseaseAllergyTypes)
  @IsNotEmpty()
  type: DiseaseAllergyTypes;

  constructor(props: DiseaseAllergyAttr) {
    super();
    this.id = props.id ? new UUID(props.id) : new UUID();
    this.name = props.name;
    this.description = props.description;
    this.type = props.type;

    this.validate(this);
  }
}
