import { StatusPostSponsorship } from '../../../shared/domain/enums/status_post_sponsorship.enum';
import { Need } from '../need';
import { Animal, AnimalAttr } from './animal';
import { AnimalSponsorshipProps } from './animal-sponsorship-props';

export type AnimalSponsorshipAttr = {
  accompany: boolean;
  reason_request: string;
  needs: Need[];
  status?: StatusPostSponsorship;
};

export class AnimalSponsorship extends Animal {
  constructor(
    private animalSponsorshipProps: AnimalSponsorshipAttr,
    animalProps: AnimalAttr,
  ) {
    const props = new AnimalSponsorshipProps(
      animalSponsorshipProps,
      animalProps,
    );
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
      needs: this.animalSponsorshipProps.needs.map((n) => n.toJson()),
    };
  }

  updateStatus(status: StatusPostSponsorship) {
    this.animalSponsorshipProps.status = status;
  }

  getStatus() {
    return this.animalSponsorshipProps.status;
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
}
