import City from 'src/@core/shared/domain/value-objects/city.vo';
import Entity from '../../../shared/domain/entities/entity';
import UserProps from './user-props';
import * as bcrypt from 'bcrypt';
import State from '../../../shared/domain/value-objects/state.vo';
import { Role } from '../../../shared/domain/enums/role.enum';

export type UserAttr = {
  fullName: string,
  username: string,
  email: string,
  password: string,
  // city: City,
  // state: State,
  role: Role,
  description?: string,
  id?: string,
  created_at?: Date,
  updated_at?: Date,
  deleted_at?: Date,
}

export default class User extends Entity<UserProps> {

  constructor(attributes: UserAttr){
    super(new UserProps(attributes));
  }

  public update(fullName: string, email: string, password: string) {
    this.props.fullName = fullName;
    this.props.email = email;
    this.props.password = password;
    this.props.updated_at = new Date();
    
    this.validateProps();
  }

  public resetPassword(password: string) {
    this.props.password = password;
    this.props.updated_at = new Date();
    
    this.validateProps();
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

  public async verifyPassword(password: string) {
    return await bcrypt.compare(password, this.props.password);
  }
}
