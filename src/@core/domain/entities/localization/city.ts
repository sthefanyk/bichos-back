import { State } from './state';
import { CityProps } from './city-props';
import { EntityMarker } from 'src/@core/shared/domain/markers/entity.marker';

export type CityAttr = {
  name: string;
  state: State;
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class City implements EntityMarker {
  private props: CityProps;

  constructor(attr: CityAttr) {
    this.props = new CityProps(attr);
  }

  toJson() {
    return {
      ...this.props,
      id: this.id,
      state: this.state.toJson(),
    };
  }

  get name(): string {
    return this.props.name;
  }

  get state(): State {
    return this.props.state;
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
