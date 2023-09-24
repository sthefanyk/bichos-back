import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';
import { UserAttr } from './user';
import UserProps from './user-props';
import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';
import { ShelterAttr } from './shelter';

export default class ShelterProps extends UserProps {
  @IsString()
  @IsNotEmpty()
  responsible_cpf: string;

  @IsDate()
  @IsNotEmpty()
  responsible_date_birth: Date;

  @Length(2, 45)
  @IsString()
  @IsNotEmpty()
  name_shelter: string;

  @IsDate()
  @IsNotEmpty()
  star_date_shelter: Date;

  constructor(props: ShelterAttr, userProps: UserAttr) {
    super(userProps);
    this.responsible_cpf =
      props.responsible_cpf instanceof CPF
        ? props.responsible_cpf.cpf
        : props.responsible_cpf;
    this.responsible_date_birth = props.responsible_date_birth;
    this.name_shelter = props.name_shelter.toLowerCase();
    this.star_date_shelter = props.star_date_shelter;

    this.validate(this);
  }
}
