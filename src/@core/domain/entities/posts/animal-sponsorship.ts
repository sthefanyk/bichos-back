import { Animal, AnimalAttr } from "./animal";
import { AnimalSponsorshipProps } from "./animal-sponsorship-props";

export type AnimalSponsorshipAttr = {
    accompany: boolean;
    reason_request: string;
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
}