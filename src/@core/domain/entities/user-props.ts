import EntityProps from '../../shared/domain/entities/entity-props';
import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

export default class UserProps extends EntityProps {
  
  @IsNotEmpty()
  @Length(2, 255)
  name: string;

  @IsNotEmpty()
  @Length(2, 255)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(2, 255)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  password: string;

  constructor(
    name: string,
    email: string,
    password: string,
    id?: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
  ) {
    super(id, created_at, updated_at, deleted_at);
    this.name = name;
    this.email = email;
    this.password = password;
  }
}