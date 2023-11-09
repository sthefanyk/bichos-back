import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import AnimalModel from './animal.model';

@Entity('health')
export default class HealthModel implements ModelMarker {
  @PrimaryColumn({ unique: true })
  @OneToOne(() => AnimalModel, (animal) => animal.id)
  @JoinColumn({name: 'id_animal'})
  id_animal: string;

  @Column({ type: 'boolean' })
  neutered: boolean;

  @Column({ type: 'varchar' })
  additional: string;
}