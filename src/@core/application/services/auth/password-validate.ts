import { IsNotEmpty, IsStrongPassword, Length } from 'class-validator';
import EntityProps from 'src/@core/shared/domain/entities/entity-props';

export default class PasswordValidate extends EntityProps {
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

  constructor(password: string) {
    super();
    this.password = password;

    this.validate(this);
  }
}
