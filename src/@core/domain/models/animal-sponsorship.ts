import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { AnimalModel } from './animal.model';
import { StatusPostSponsorship } from '../../shared/domain/enums/status_post_sponsorship.enum';

@Entity('animal_sponsorship')
export class AnimalSponsorshipModel implements ModelMarker {
  @PrimaryColumn()
  @OneToOne(() => AnimalModel, (animal) => animal.id)
  @JoinColumn({ name: 'animal_id' })
  id: string;

  @Column({ type: 'boolean' })
  accompany: boolean;

  @Column({ type: 'varchar', length: 255 })
  reason_request: string;

  @OneToOne(() => AnimalModel)
  @JoinColumn({ name: 'animal' })
  animal: AnimalModel;

  @Column({
    type: 'enum',
    enum: StatusPostSponsorship,
    default: StatusPostSponsorship.WAITING_GODFATHER,
  })
  status: StatusPostSponsorship;
}
