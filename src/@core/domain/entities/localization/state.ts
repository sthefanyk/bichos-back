import { EntityMarker } from '../../../shared/domain/markers/entity.marker';
import { StateProps } from './state-props';

export type StateAttr = {
  name: string;
  abbreviation: string;
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class State implements EntityMarker {
  private props: StateProps;

  constructor(attr: StateAttr) {
    this.props = new StateProps(attr);
  }

  toJson() {
    return {
      ...this.props,
      id: this.id,
    };
  }

  get name(): string {
    return this.props.name;
  }

  get abbreviation(): string {
    return this.props.abbreviation;
  }

  get id(): string {
    return this.props.id.id;
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
