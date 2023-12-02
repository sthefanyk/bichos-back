import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { DoseAttr } from './dose';
import EntityPropsValidation from '../../../shared/domain/entities/entity-props-validation';
import UUID from '../../../shared/domain/value-objects/uuid.vo';

export class DoseProps extends EntityPropsValidation {
  id: UUID;

  @IsNumber()
  @IsNotEmpty()
  number_dose: number;

  @IsDate()
  @IsNotEmpty()
  application_date: Date;

  @IsBoolean()
  @IsNotEmpty()
  applied: boolean;

  constructor(props: DoseAttr) {
    super();
    this.id = props.id ? new UUID(props.id) : new UUID();
    this.number_dose = props.number_dose;
    this.application_date = props.application_date;
    this.applied = props.applied;

    this.validate(this);
  }
}
