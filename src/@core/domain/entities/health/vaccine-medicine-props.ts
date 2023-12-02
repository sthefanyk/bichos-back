import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { VaccineMedicineAttr } from './vaccine-medicine';
import EntityPropsValidation from 'src/@core/shared/domain/entities/entity-props-validation';
import { VaccineMedicineTypes } from 'src/@core/shared/domain/enums/vaccine-medicine.enum';
import { Dose } from './dose';
import UUID from 'src/@core/shared/domain/value-objects/uuid.vo';

export class VaccineMedicineProps extends EntityPropsValidation {
  id: UUID;

  @Length(2, 45)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(VaccineMedicineTypes)
  @IsNotEmpty()
  type: VaccineMedicineTypes;

  @IsNotEmpty()
  doses: Dose[];

  @IsNumber()
  @IsNotEmpty()
  total_dose: number;

  constructor(props: VaccineMedicineAttr) {
    super();
    this.id = props.id ? new UUID(props.id) : new UUID();
    this.name = props.name;
    this.type = props.type;
    this.doses = props.doses;
    this.total_dose = props.total_dose;

    this.validate(this);
  }
}
