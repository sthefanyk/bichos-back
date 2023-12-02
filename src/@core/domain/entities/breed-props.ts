import EntityProps from '../../shared/domain/entities/entity-props';
import { IsNotEmpty, IsString, Length, IsEnum } from 'class-validator';
import { BreedAttr } from './breed';
import { Species } from '../../shared/domain/enums/species.enum';

export default class BreedProps extends EntityProps {
  @IsNotEmpty()
  @Length(2, 45)
  @IsString()
  name: string;

  @IsEnum(Species)
  @IsNotEmpty()
  specie: Species;

  constructor(props: BreedAttr) {
    super(props.id, props.created_at, props.updated_at, props.deleted_at);
    this.name = props.name.toLowerCase();
    this.specie = props.specie;
    this.validate(this);
  }
}
