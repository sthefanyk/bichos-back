import { Column, Entity, PrimaryColumn } from 'typeorm';
import Model from './model';
import PersonalityProps from '../entities/personality-props';
import Personality from '../entities/personality';

@Entity('personalities')
export default class PersonalityModel implements Model<PersonalityProps, Personality> {
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
