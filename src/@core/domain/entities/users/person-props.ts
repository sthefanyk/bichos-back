import { PersonAttr } from './person';
import { UserAttr } from './user';
import UserProps from './user-props';
import { IsDate, IsNotEmpty, MinLength } from 'class-validator';

export default class PersonProps extends UserProps {

  @MinLength(11)
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
    this.cpf = props.cpf;
    this.date_birth = props.date_birth;
  }
}
