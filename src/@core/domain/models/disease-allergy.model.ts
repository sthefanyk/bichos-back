import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { DiseaseAllergyTypes } from '../../shared/domain/enums/disease-allergy.enum';
import { HealthModel } from '.';

@Entity('disease_allergy')
export class DiseaseAllergyModel implements ModelMarker {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({
    type: 'enum',
    enum: DiseaseAllergyTypes,
    default: DiseaseAllergyTypes.DISEASE,
  })
  type: DiseaseAllergyTypes;

  @ManyToOne(() => HealthModel, (i) => i.disease_allergy)
  @JoinColumn({ name: 'health' })
  health: HealthModel;
}
