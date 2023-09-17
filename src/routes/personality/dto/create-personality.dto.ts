import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  IsDate,
} from 'class-validator';

export class CreatePersonalityDto {
  @IsNotEmpty()
  @Length(2, 45)
  @IsString()
  name: string;

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
