import { EntityMarker } from 'src/@core/shared/domain/markers/entity.marker';
import AlternativeProps from './alternative-props';

export type AlternativeAttr = {
  id?: string;
  alternative: string;
};

export class Alternative implements EntityMarker {
  private props: AlternativeProps;

  constructor(alternativeAttr: AlternativeAttr) {
    this.props = new AlternativeProps(alternativeAttr);
  }

  toJson() {
    return { ...this.props, id: this.id };
  }

  get id(): string {
    return this.props.id.id;
  }

  get alternative(): string {
    return this.props.alternative;
  }
}
