import { EntityMarker } from 'src/@core/shared/domain/markers/entity.marker';
import { NeedProps } from './need-props';

export type NeedAttr = {
  name: string;
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class Need implements EntityMarker {
  private props: NeedProps;

  constructor(attr: NeedAttr) {
    this.props = new NeedProps(attr);
    this.props.validate(this.props);
  }

  toJson() {
    return { ...this.props, id: this.props.id.id };
  }

  public update(name: string) {
    this.props.name = name;
    this.props.updated_at = new Date();

    this.props.validate(this.props);
  }

  public activate() {
    this.props.deleted_at = null;
  }

  public inactivate() {
    this.props.deleted_at = new Date();
  }

  get name(): string {
    return this.props.name;
  }

  get id(): string {
    return this.props.id.getIdString();
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  get updated_at(): Date {
    return this.props.updated_at;
  }

  get deleted_at(): Date {
    return this.props.deleted_at;
  }
}
