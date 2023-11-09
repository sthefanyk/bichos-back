import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import AnimalModel from './animal.model';
import { DiseaseAllergyTypes } from 'src/@core/shared/domain/enums/disease-allergy.enum';

@Entity('disease_allergy')
export default class DiseaseAllergyModel implements ModelMarker {
  @PrimaryColumn({ unique: true })
  @OneToOne(() => AnimalModel, (animal) => animal.id)
  @JoinColumn({name: 'id_animal'})
  id_animal: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'simple-enum', default: DiseaseAllergyTypes.DISEASE })
  type: DiseaseAllergyTypes;
}