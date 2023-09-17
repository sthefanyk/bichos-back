import Entity from '../../shared/domain/entities/entity';
import UserProps from './user-props';

export default class User extends Entity<UserProps> {
  public update(name: string, email: string, password: string) {
    this.props.name = name;
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
}
