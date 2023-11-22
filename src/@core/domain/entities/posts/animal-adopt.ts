import { SizeAnimal } from "src/@core/shared/domain/enums/size-animal";
import { Animal, AnimalAttr } from "./animal";
import { AnimalAdoptProps } from "./animal-adopt-props";
import { Health } from "../health/health";
import { StatusPostAdopt } from "src/@core/shared/domain/enums/status_post_adopt.enum";

export type AnimalAdoptAttr = {
    size_current: SizeAnimal;
    size_estimated: SizeAnimal;
    breed: string;
    health: Health;
    status: StatusPostAdopt;
    update_status_at: Date;
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
            size_current: this.size_current,
            size_estimated: this.size_estimated,
            breed: this.breed,
            status: this.status,
            update_status_at: this.update_status_at,
            health: this.health.toJson(),
        };
    }

    checkStatus() {
        const current_date = new Date();
        const updated_date = new Date(this.update_status_at);
        const days = 15 * 24 * 60 * 60 * 1000; // 15 days
        const min = 1 * 60 * 1000; // 1 min
        
        if (
            this.status === StatusPostAdopt.WAITING_QUESTIONNAIRES &&
            (current_date.getTime() - updated_date.getTime()) > days
        ) {
            this.animalAdoptProps.status = StatusPostAdopt.WAITING_RENEWAL
            this.animalAdoptProps.update_status_at = new Date();
        }

        // console.log({
        //     current_date,
        //     updated_date,
        //     status: this.status
        // })

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

    get update_status_at(): Date {
        return this.animalAdoptProps.update_status_at;
    }
}