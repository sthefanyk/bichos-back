import { EntityMarker } from '../../shared/domain/markers/entity.marker';
import BreedProps from './breed-props';
import { Species } from '../../shared/domain/enums/species.enum';

export type BreedAttr = {
  name: string;
  specie: Species;
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export class Breed implements EntityMarker {
  private breedProps: BreedProps;

  constructor(private breedAttr: BreedAttr) {
    breedAttr.specie = +breedAttr.specie;
    this.breedProps = new BreedProps(this.breedAttr);
    this.breedProps.validate(this.breedProps);
  }

  toJson() {
    return { ...this.breedProps, id: this.breedProps.id.id };
  }

  public update(name: string, specie: Species) {
    this.breedProps.name = name;
    this.breedProps.specie = specie;
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

  get specie(): Species {
    return this.breedProps.specie;
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
