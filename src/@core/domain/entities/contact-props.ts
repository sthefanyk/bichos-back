import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';
import { ContactAttr } from './contact';
import { City } from './localization/city';
import EntityPropsValidation from 'src/@core/shared/domain/entities/entity-props-validation';
import Phone from 'src/@core/shared/domain/value-objects/phone.vo';
import UUID from 'src/@core/shared/domain/value-objects/uuid.vo';

export default class ContactProps extends EntityPropsValidation {

  id: UUID;

  @IsNotEmpty()
  @Length(2, 45)
  @IsString()
  name: string;

  @IsNotEmpty()
  @Length(2, 45)
  @IsString()
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  @IsString()
  phone: Phone;

  city: City;

  constructor(props: ContactAttr) {
    super();
    this.id = props.id ? new UUID(props.id) : new UUID();
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.city = props.city;

    this.validate(this);
  }
}
