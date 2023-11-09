import { SizeAnimal } from "src/@core/shared/domain/enums/size-animal";
import { Animal, AnimalAttr } from "./animal";
import { AnimalAdoptProps } from "./animal-adopt-props";
import { Health } from "../health/health";

export type AnimalAdoptAttr = {
    size_current: SizeAnimal;
    size_estimated: SizeAnimal;
    breed: string;
    health: Health;
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

    toJson() {
        const animal = super.toJson();
        return { 
            ...animal,
            health: this.health.toJson()
        };
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