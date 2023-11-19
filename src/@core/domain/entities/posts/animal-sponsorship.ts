import { StatusPostSponsorship } from "src/@core/shared/domain/enums/status_post_sponsorship.enum";
import { Need } from "../need";
import { Animal, AnimalAttr } from "./animal";
import { AnimalSponsorshipProps } from "./animal-sponsorship-props";

export type AnimalSponsorshipAttr = {
    accompany: boolean;
    reason_request: string;
    needs: Need[];
    status: StatusPostSponsorship;
    update_status_at: Date;
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
            accompany: this.accompany,
            reason_request: this.reason_request,
            status: this.status,
            update_status_at: this.update_status_at,
            needs: this.animalSponsorshipProps.needs.map(n => n.toJson()),
        };
    }

    checkStatus() {
        const current_date = new Date();
        const updated_date = new Date(this.update_status_at);
        const days = 15 * 24 * 60 * 60 * 1000; // 15 days
        
        if (
            this.status === StatusPostSponsorship.WAITING_GODFATHER &&
            (current_date.getTime() - updated_date.getTime()) > days
        ) {
            this.animalSponsorshipProps.status = StatusPostSponsorship.WAITING_RENEWAL
            this.animalSponsorshipProps.update_status_at = new Date();
        }
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

    get status(): StatusPostSponsorship {
        return this.animalSponsorshipProps.status;
    }

    get update_status_at(): Date {
        return this.animalSponsorshipProps.update_status_at;
    }
}