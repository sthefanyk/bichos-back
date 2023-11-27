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
import { ImageAttr, UserAttr } from './user';
import { City } from '../localization/city';

export default class UserProps extends EntityProps {
  @IsNotEmpty()
  @Length(2, 255)
  @IsString()
  full_name: string;

  @IsNotEmpty()
  @Length(2, 16)
  @IsString()
  username: string;

  @IsNotEmpty()
  @Length(2, 16)
  @IsString()
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

  city: City;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  description: string;

  profile_picture: ImageAttr;

  header_picture: ImageAttr;

  constructor(props: UserAttr) {
    super(props.id, props.created_at, props.updated_at, props.deleted_at);
    this.full_name = props.full_name.toLowerCase();
    this.username = props.username.toLowerCase();
    this.name = props.name.toLowerCase();
    this.city = props.city;
    this.email = props.email.toLowerCase();
    this.password = props.password;
    this.role = props.role;
    this.description = props.description;
    this.profile_picture = props.profile_picture;
    this.header_picture = props.header_picture;
  }
}


