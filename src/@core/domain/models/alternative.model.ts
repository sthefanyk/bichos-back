import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';

@Entity('alternative')
export default class AlternativeModel implements ModelMarker {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar' })
  alternative: string;

  @Column({ type: 'varchar' })
  id_question: string;
}
