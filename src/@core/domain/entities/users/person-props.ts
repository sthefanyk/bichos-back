import CPF from 'src/@core/shared/domain/value-objects/cpf.vo';
import { PersonAttr } from './person';
import { UserAttr } from './user';
import UserProps from './user-props';
import { IsDate, IsNotEmpty, Length } from 'class-validator';

export default class PersonProps extends UserProps {

  @Length(11, 11)
  @IsNotEmpty()
  cpf: string;

  @IsDate()
  @IsNotEmpty()
  date_birth: Date;

  constructor(
    props: PersonAttr,
    userProps: UserAttr
  ) {
    super(userProps);
    this.cpf = props.cpf instanceof CPF ? props.cpf.cpf : props.cpf;
    this.date_birth = props.date_birth;

    this.validate(this);
  }
}
