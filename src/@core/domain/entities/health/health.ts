import { EntityMarker } from '../../../shared/domain/markers/entity.marker';
import { HealthProps } from './health-props';
import { VaccineMedicine } from './vaccine-medicine';
import { DiseaseAllergy } from './disease-allergy';

export type HealthAttr = {
  neutered: boolean;
  additional: string;
  disease_allergy: DiseaseAllergy[];
  vaccines_medicines: VaccineMedicine[];
};

export class Health implements EntityMarker {
  private props: HealthProps;

  constructor(attr: HealthAttr) {
    this.props = new HealthProps(attr);
  }

  toJson() {
    return {
      ...this.props,
      vaccines_medicines: this.vaccines_medicines.map((item) => item.toJson()),
      disease_allergy: this.disease_allergy.map((item) => item.toJson()),
    };
  }

  get neutered(): boolean {
    return this.props.neutered;
  }

  get vaccines_medicines(): VaccineMedicine[] {
    return this.props.vaccines_medicines;
  }

  get disease_allergy(): DiseaseAllergy[] {
    return this.props.disease_allergy;
  }

  get additional(): string {
    return this.props.additional;
  }
}
