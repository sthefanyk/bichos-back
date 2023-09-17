import { IsNotEmpty, IsString, IsOptional, MaxLength, IsEmail, IsStrongPassword, IsDate } from 'class-validator';

export class CreateUsersDto {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    @IsNotEmpty()
    password: string;
  
    // @IsBoolean()
    // @IsOptional()
    // is_active: boolean;
  
    @IsDate()
    @IsOptional()
    created_at: Date;

    @IsDate()
    @IsOptional()
    updated_at: Date;

    @IsDate()
    @IsOptional()
    deleted_at: Date;
}
