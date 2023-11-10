import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import VaccineMedicineModel from './vaccine-medicine.model';

@Entity('dose')
export default class DoseModel implements ModelMarker {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'integer' })
  number_dose: number;

  @Column({ type: 'datetime' })
  application_date: Date;

  @Column({ type: 'boolean', default: false })
  applied: boolean;

  // @ManyToOne(() => VaccineMedicineModel, (vm) => vm.id)
  // @JoinColumn({ name: 'id_vaccine_medicine', referencedColumnName: 'id' })
  // vaccineMedicine: VaccineMedicineModel;

  @Column({ type: 'varchar' })
  id_vaccine_medicine: string;
}
