import EntityProps from '../../shared/domain/entities/entity-props';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { BreedAttr } from './breed';

export default class BreedProps extends EntityProps {
  @IsNotEmpty()
  @Length(2, 45)
  @IsString()
  name: string;

  constructor(props: BreedAttr) {
    super(props.id, props.created_at, props.updated_at, props.deleted_at);
    this.name = props.name.toLowerCase();

    this.validate(this);
  }
}
