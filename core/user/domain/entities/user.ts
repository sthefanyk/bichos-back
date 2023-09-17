import Entity from '../../../@seedwork/domain/entity/entity';
import { EntityValidationError } from '../../../@seedwork/domain/errors/validation-error';
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';
import UserValidatorFactory from '../validators/user.validator';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  is_active?: boolean;
  created_at?: Date;
};

export class User extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: UniqueEntityId,
  ) {
    User.validate(props);
    super(props, id);
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    if (!validator.validate(props)) {
      throw new EntityValidationError(validator.errors);
    }
  }

  update(name: string, email: string, password: string): void {
    User.validate({ name, email, password, is_active: this.is_active });
    this.props.name = name;
    this.props.email = email;
    this.props.password = password;
  }

  activate() {
    this.props.is_active = true;
  }

  deactivate() {
    this.props.is_active = false;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get is_active() {
    return this.props.is_active;
  }

  get created_at() {
    return this.props.created_at;
  }
}
