import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { DiseaseAllergyTypes } from 'src/@core/shared/domain/enums/disease-allergy.enum';
import { HealthModel, AnimalModel } from '.';

@Entity('disease_allergy')
export class DiseaseAllergyModel implements ModelMarker {
  @PrimaryColumn({ unique: true })
  @OneToOne(() => AnimalModel, (animal) => animal.id)
  @JoinColumn({name: 'id_animal'})
  id_animal: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'enum', enum: DiseaseAllergyTypes, default: DiseaseAllergyTypes.DISEASE })
  type: DiseaseAllergyTypes;

  @ManyToOne(() => HealthModel, (i) => i.disease_allergy)
  @JoinColumn({name: 'health'})
  health: HealthModel;
}