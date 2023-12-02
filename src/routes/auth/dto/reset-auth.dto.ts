import { IsJWT, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ResetAuthDto {
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  @IsNotEmpty()
  password: string;

  @IsJWT()
  token: string;
}
