import { Column, Entity, PrimaryColumn } from 'typeorm';
import PersonalityProps from '../entities/personality-props';
import Personality from '../entities/personality';
import { ModelMarker } from '../../shared/domain/markers/model.marker';

@Entity('personalities')
export default class PersonalityModel implements ModelMarker {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'datetime', default: null })
  updated_at: Date;

  @Column({ type: 'datetime', default: null })
  deleted_at: Date;

  getEntity(model: this): Personality {
    return new Personality(
      new PersonalityProps(
        model.name,
        model.id,
        model.created_at,
        model.updated_at,
        model.deleted_at,
      ),
    );
  }
}
