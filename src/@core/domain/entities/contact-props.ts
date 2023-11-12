import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ContactAttr } from './contact';
import { City } from './localization/city';
import EntityPropsValidation from 'src/@core/shared/domain/entities/entity-props-validation';
import Phone from 'src/@core/shared/domain/value-objects/phone.vo';

export default class ContactProps extends EntityPropsValidation {

  @IsNotEmpty()
  @Length(2, 45)
  @IsString()
  name: string;

  @IsNotEmpty()
  @Length(2, 45)
  @IsString()
  email: string;

  @IsNotEmpty()
  phone: Phone;

  city: City;

  constructor(props: ContactAttr) {
    super();
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.city = props.city;

    this.validate(this);
  }
}
