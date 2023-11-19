import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { SexAnimal } from 'src/@core/shared/domain/enums/sex-animal';
import { Species } from 'src/@core/shared/domain/enums/species.enum';

@Entity('animal')
export default class AnimalModel implements ModelMarker {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'simple-enum', default: SexAnimal.MALE })
  sex: SexAnimal;

  @Column({ type: 'datetime' })
  date_birth: Date;

  @Column({ type: 'simple-enum', default: Species.DOG })
  species: Species;

  @Column({ type: 'varchar', default: '' })
  history?: string;

  @Column({ type: 'varchar', default: '' })
  characteristic?: string;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'datetime', default: null })
  updated_at: Date;

  @Column({ type: 'datetime', default: null })
  deleted_at: Date;
}

