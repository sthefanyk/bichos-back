import { Role } from '../../../shared/domain/enums/role.enum';
import EntityProps from '../../../shared/domain/entities/entity-props';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';
import { UserAttr } from './user';

export default class UserProps extends EntityProps {
  @IsNotEmpty()
  @Length(2, 255)
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @Length(2, 16)
  @IsString()
  username: string;

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

  // @IsObject()
  // city: City;

  // @IsObject()
  // state: State;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string;

  constructor(props: UserAttr) {
    super(props.id, props.created_at, props.updated_at, props.deleted_at);
    this.fullName = props.fullName;
    this.username = props.username;
    // this.city = props.city;
    // this.state = props.state;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
    this.description = props.description;
  }
}


