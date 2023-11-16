import UserProps from './user-props';
import * as bcrypt from 'bcrypt';
import { Role } from '../../../shared/domain/enums/role.enum';
import { City } from '../localization/city';
import { EntityMarker } from 'src/@core/shared/domain/markers/entity.marker';

export type UserAttr = {
  full_name: string,
  username: string,
  name: string,
  email: string,
  password: string,
  city: City,
  role?: Role,
  description?: string,
  profile_picture?: string,
  header_picture?: string,
  id?: string,
  created_at?: Date,
  updated_at?: Date,
  deleted_at?: Date,
}

export default abstract class User implements EntityMarker {

  constructor(private props: UserProps){
    props.validate(props);
  }

  toJson() {
    const city = this.city.toJson();
    return {
      ...this.props,
      id: this.id,
      city: {
        name: city.name,
        state: {
          name: city.state.name,
          abbreviation: city.state.abbreviation,
        }
      },
    }
  }

  public async resetPassword(password: string) {
    this.props.password = password;
    this.props.updated_at = new Date();
    
    this.props.validate(this.props);
    await this.generatePasswordHash();
  }

  public updateUser(data: {
    full_name: string;
    username: string;
    name: string;
    email: string;
    city: City;
    description?: string;
    profile_picture?: string;
    header_picture?: string;
  }) {
    this.props.full_name = data.full_name.toLowerCase();
    this.props.username = data.username.toLowerCase();
    this.props.name = data.name.toLowerCase();
    this.props.email = data.email.toLowerCase();
    this.props.city = data.city;
    this.props.description = data.description ?? this.props.description;
    this.props.profile_picture = data.profile_picture ?? this.props.profile_picture;
    this.props.header_picture = data.header_picture ?? this.props.header_picture;

    this.props.updated_at = new Date();
    
    this.props.validate(this.props);
  }

  public activate() {
    this.props.deleted_at = null;
  }

  public deactivate() {
    this.props.deleted_at = new Date();
  }

  public async generatePasswordHash() {
    const salt = await bcrypt.genSalt();
    this.props.password =  await bcrypt.hash(this.props.password, salt);
  }

  get user(): UserAttr {
    return {
      id: this.id,
      full_name: this.full_name,
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      description: this.description,
      header_picture: this.header_picture,
      profile_picture: this.profile_picture,
      role: this.role,
      city: this.city,
      created_at: this.created_at,
      deleted_at: this.deleted_at,
      updated_at: this.updated_at,
    };
  }

  get full_name(): string {
    return this.props.full_name;
  }

  get username(): string {
    return this.props.username;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get city(): City {
    return this.props.city;
  }

  get role(): Role {
    return this.props.role;
  }

  get description(): string {
    return this.props.description;
  }

  get profile_picture(): string {
    return this.props.profile_picture;
  }

  get header_picture(): string {
    return this.props.header_picture;
  }

  get id(): string {
    return this.props.id.id;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  get updated_at(): Date {
    return this.props.updated_at;
  }

  get deleted_at(): Date {
    return this.props.deleted_at;
  }
}
