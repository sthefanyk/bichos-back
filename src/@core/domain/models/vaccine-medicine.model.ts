import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { VaccineMedicineTypes } from '../../shared/domain/enums/vaccine-medicine.enum';
import { DoseModel, HealthModel } from '.';

@Entity('vaccine_medicine')
export class VaccineMedicineModel implements ModelMarker {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({
    type: 'enum',
    enum: VaccineMedicineTypes,
    default: VaccineMedicineTypes.MEDICINES,
  })
  type: VaccineMedicineTypes;

  @Column({ type: 'integer' })
  total_dose: number;

  @OneToMany(() => DoseModel, (i) => i.vaccine_medicine)
  @JoinColumn({ name: 'dose' })
  doses: DoseModel[];

  @ManyToOne(() => HealthModel, (i) => i.vaccines_medicines)
  @JoinColumn({ name: 'health' })
  health: HealthModel;
}
