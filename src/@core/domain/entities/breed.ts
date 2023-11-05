import { EntityMarker } from 'src/@core/shared/domain/markers/entity.marker';
import BreedProps from './breed-props';

export type BreedAttr = {
  name: string;
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class Breed implements EntityMarker {
  private breedProps: BreedProps;

  constructor(private breedAttr: BreedAttr) {
    this.breedProps = new BreedProps(breedAttr);
    this.breedProps.validate(this.breedProps);
  }

  toJson() {
    return { ...this.breedProps, id: this.breedProps.id.id };
  }

  public update(name: string) {
    this.breedProps.name = name;
    this.breedProps.updated_at = new Date();

    this.breedProps.validate(this.breedProps);
  }

  public activate() {
    this.breedProps.deleted_at = null;
  }

  public inactivate() {
    this.breedProps.deleted_at = new Date();
  }

  get name(): string {
    return this.breedProps.name;
  }

  get id(): string {
    return this.breedProps.id.getIdString();
  }

  get created_at(): Date {
    return this.breedProps.created_at;
  }

  get updated_at(): Date {
    return this.breedProps.updated_at;
  }

  get deleted_at(): Date {
    return this.breedProps.deleted_at;
  }
}
