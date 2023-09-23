import Entity from '../../../shared/domain/entities/entity';
import UserProps from './user-props';
import * as bcrypt from 'bcrypt';
import { Role } from '../../../shared/domain/enums/role.enum';
import { City } from '../localization/city';

export type UserAttr = {
  fullName: string,
  username: string,
  email: string,
  password: string,
  city: City,
  role?: Role,
  description?: string,
  id?: string,
  created_at?: Date,
  updated_at?: Date,
  deleted_at?: Date,
}

export default abstract class User extends Entity<UserProps> {

  constructor(props: UserProps){
    super(props);
  }

  public resetPassword(password: string) {
    this.props.password = password;
    this.props.updated_at = new Date();
    
    this.props.validate(this.props);
  }

  abstract update(data: any): void;

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
