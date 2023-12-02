import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { AnimalModel, DiseaseAllergyModel, VaccineMedicineModel } from '.';

@Entity('health')
export class HealthModel implements ModelMarker {
  @PrimaryColumn({ unique: true })
  @OneToOne(() => AnimalModel, (animal) => animal.id)
  @JoinColumn({ name: 'id_animal' })
  id_animal: string;

  @Column({ type: 'boolean' })
  neutered: boolean;

  @Column({ type: 'varchar' })
  additional: string;

  @OneToMany(() => DiseaseAllergyModel, (i) => i.health)
  @JoinColumn({ name: 'disease_allergy' })
  disease_allergy: DiseaseAllergyModel[];

  @OneToMany(() => VaccineMedicineModel, (i) => i.health)
  @JoinColumn({ name: 'vaccines_medicines' })
  vaccines_medicines: VaccineMedicineModel[];
}
