import { Need } from "../need";
import { Animal, AnimalAttr } from "./animal";
import { AnimalSponsorshipProps } from "./animal-sponsorship-props";

export type AnimalSponsorshipAttr = {
    accompany: boolean;
    reason_request: string;
    needs: Need[];
}

export class AnimalSponsorship extends Animal {
    constructor(
        private animalSponsorshipProps: AnimalSponsorshipAttr,
        animalProps: AnimalAttr,
    ) {
        const props = new AnimalSponsorshipProps(animalSponsorshipProps, animalProps);
        props.validate(props);
        super(props);
    }

    toJson() {
        const animal = super.toJson();
        return { 
            ...animal,
            needs: this.animalSponsorshipProps.needs.map(n => n.toJson())
        };
    }

    get accompany(): boolean {
        return this.animalSponsorshipProps.accompany;
    }

    get reason_request(): string {
        return this.animalSponsorshipProps.reason_request;
    }

    get needs(): Need[] {
        return this.animalSponsorshipProps.needs;
    }
}