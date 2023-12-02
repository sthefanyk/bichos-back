import { SizeAnimal } from 'src/@core/shared/domain/enums/size-animal';
import { Animal, AnimalAttr } from './animal';
import { AnimalAdoptProps } from './animal-adopt-props';
import { Health } from '../health/health';
import { StatusPostAdopt } from 'src/@core/shared/domain/enums/status_post_adopt.enum';

export type AnimalAdoptAttr = {
  size_current: SizeAnimal;
  size_estimated: SizeAnimal;
  breed: string;
  health: Health;
  status?: StatusPostAdopt;
};

export class AnimalAdopt extends Animal {
  constructor(
    private animalAdoptProps: AnimalAdoptAttr,
    animalProps: AnimalAttr,
  ) {
    const props = new AnimalAdoptProps(animalAdoptProps, animalProps);
    props.validate(props);
    super(props);
  }

  toJson() {
    const animal = super.toJson();
    return {
      ...animal,
      size_current: this.size_current,
      size_estimated: this.size_estimated,
      breed: this.breed,
      status: this.status,
      health: this.health.toJson(),
    };
  }

  updateStatus(status: StatusPostAdopt) {
    this.animalAdoptProps.status = status;
  }

  getStatus() {
    return this.animalAdoptProps.status;
  }

  get status(): StatusPostAdopt {
    return this.animalAdoptProps.status;
  }

  get size_current(): SizeAnimal {
    return this.animalAdoptProps.size_current;
  }

  get size_estimated(): SizeAnimal {
    return this.animalAdoptProps.size_estimated;
  }

  get breed(): string {
    return this.animalAdoptProps.breed;
  }

  get health(): Health {
    return this.animalAdoptProps.health;
  }
}
