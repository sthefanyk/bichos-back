import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';

@Entity('person')
export default class PersonModel implements ModelMarker {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 11 })
  cpf: string;

  @Column({ type: 'date' })
  date_birth: Date;
}
