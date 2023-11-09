import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import AnimalModel from './animal.model';
import { VaccineMedicineTypes } from 'src/@core/shared/domain/enums/vaccine-medicine.enum';

@Entity('vaccine_medicine')
export default class VaccineMedicineModel implements ModelMarker {
  @PrimaryColumn({ unique: true })
  @OneToOne(() => AnimalModel, (animal) => animal.id)
  @JoinColumn({name: 'id_animal'})
  id_animal: AnimalModel;

  @Column({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'simple-enum', default: VaccineMedicineTypes.MEDICINES })
  type: VaccineMedicineTypes;

  @Column({ type: 'integer' })
  total_dose: number;
}