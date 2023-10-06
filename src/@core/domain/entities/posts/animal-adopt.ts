import { SizeAnimal } from "src/@core/shared/domain/enums/size-animal";
import { Animal, AnimalAttr } from "./animal";
import { AnimalAdoptProps } from "./animal-adopt-props";

export type AnimalAdoptAttr = {
    size: SizeAnimal;
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

    get size(): SizeAnimal {
        return this.animalAdoptProps.size;
    }
}