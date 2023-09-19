import { Role } from '../../../shared/domain/enums/role.enum';
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
    cpf: string,
    date_birth: Date,
    name: string,
    email: string,
    password: string,
    id?: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
  ) {
    super(name, email, password, Role.PERSON, id, created_at, updated_at, deleted_at);
    this.cpf = cpf;
    this.date_birth = date_birth;
  }
}
