import { VaccineMedicineTypes } from 'src/@core/shared/domain/enums/vaccine-medicine.enum';
import { VaccineMedicineProps } from './vaccine-medicine-props';
import { Dose } from './dose';

export type VaccineMedicineAttr = {
  id?: string;
  name: string;
  type: VaccineMedicineTypes;
  doses: Dose[];
  total_dose: number;
};

export class VaccineMedicine {
  private props: VaccineMedicineProps;

  constructor(attr: VaccineMedicineAttr) {
    this.props = new VaccineMedicineProps(attr);
  }

  toJson() {
    return {
      ...this.props,
      id: this.id,
      doses: this.doses.map((dose) => dose.toJson()),
    };
  }

  get id(): string {
    return this.props.id.id;
  }

  get name(): string {
    return this.props.name;
  }

  get type(): VaccineMedicineTypes {
    return this.props.type;
  }

  get doses(): Dose[] {
    return this.props.doses;
  }

  get total_dose(): number {
    return this.props.total_dose;
  }
}
