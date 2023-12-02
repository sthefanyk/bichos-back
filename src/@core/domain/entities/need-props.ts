import EntityProps from '../../shared/domain/entities/entity-props';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { NeedAttr } from './need';

export class NeedProps extends EntityProps {
  @IsNotEmpty()
  @Length(2, 45)
  @IsString()
  name: string;

  constructor(props: NeedAttr) {
    super(props.id, props.created_at, props.updated_at, props.deleted_at);
    this.name = props.name;

    this.validate(this);
  }
}
