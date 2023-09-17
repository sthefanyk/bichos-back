import { Column, Entity, PrimaryColumn } from 'typeorm';
import Model from './model';
import User from '../entities/user';
import UserProps from '../entities/user-props';

@Entity('users')
export default class UserModel implements Model<UserProps, User> {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'datetime', default: null })
  updated_at: Date;

  @Column({ type: 'datetime', default: null })
  deleted_at: Date;

  getEntity(model: this): User {
    return new User(
      new UserProps(
        model.name,
        model.email,
        model.password,
        model.id,
        model.created_at,
        model.updated_at,
        model.deleted_at,
      ),
    );
  }
}
