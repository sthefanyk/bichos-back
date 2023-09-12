import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePersonalityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
