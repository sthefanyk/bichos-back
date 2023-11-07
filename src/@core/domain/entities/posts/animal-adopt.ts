import { SizeAnimal } from "src/@core/shared/domain/enums/size-animal";
import { Animal, AnimalAttr } from "./animal";
import { AnimalAdoptProps } from "./animal-adopt-props";
import { Breed } from "../breed";

export type AnimalAdoptAttr = {
    size_current: SizeAnimal;
    size_estimated: SizeAnimal;
    breed: Breed;
}

export class AnimalAdopt extends Animal {
    constructor(
        private animalAdoptProps: AnimalAdoptAttr,
        animalProps: AnimalAttr,
    ) {
        const props = new AnimalAdoptProps(animalAdoptProps, animalProps);
        props.validate(props);
        super(props);
    }

    get size_current(): SizeAnimal {
        return this.animalAdoptProps.size_current;
    }

    get size_estimated(): SizeAnimal {
        return this.animalAdoptProps.size_estimated;
    }

    get breed(): Breed {
        return this.animalAdoptProps.breed;
    }
}