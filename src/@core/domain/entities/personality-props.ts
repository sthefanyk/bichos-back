import EntityProps from '../../shared/domain/entities/entity-props';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export default class PersonalityProps extends EntityProps {
  
  @IsNotEmpty()
  @Length(2, 45)
  @IsString()
  name: string;

  constructor(
    name: string,
    id?: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
  ) {
    super(id, created_at, updated_at, deleted_at);
    this.name = name;
  }
}