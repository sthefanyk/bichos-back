import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { VaccineMedicineModel } from './vaccine-medicine.model';

@Entity('dose')
export class DoseModel implements ModelMarker {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'integer' })
  number_dose: number;

  @Column({ type: 'datetime' })
  application_date: Date;

  @Column({ type: 'boolean', default: false })
  applied: boolean;

  @ManyToOne(() => VaccineMedicineModel, (i) => i.doses)
  @JoinColumn({ name: 'vaccine_medicine' })
  vaccine_medicine: VaccineMedicineModel;

  @Column({ type: 'varchar' })
  id_vaccine_medicine: string;
}
