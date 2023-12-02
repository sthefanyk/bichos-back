import { IsString, Length } from 'class-validator';
import EntityProps from '../../../shared/domain/entities/entity-props';
import { StateAttr } from './state';

export class StateProps extends EntityProps {
  @IsString()
  @Length(2, 45)
  name: string;

  @IsString()
  @Length(2, 2)
  abbreviation: string;

  constructor(props: StateAttr) {
    super(props.id, props.created_at, props.updated_at, props.deleted_at);
    this.name = props.name.toUpperCase();
    this.abbreviation = props.abbreviation.toUpperCase();

    this.validate(this);
  }
}
