import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { UserModel, PostModel } from '.';
import { StatusSponsorship } from '../../shared/domain/enums/status_sponsorship.enum';

@Entity('sponsorship')
export class SponsorshipModel implements ModelMarker {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => UserModel, (user) => user.id)
  @JoinColumn({ name: 'id_godfather' })
  godfather: UserModel;

  @ManyToOne(() => PostModel, (post) => post.id)
  @JoinColumn({ name: 'id_post' })
  post: PostModel;

  @Column({
    type: 'enum',
    enum: StatusSponsorship,
    default: StatusSponsorship.IN_PROCESS,
  })
  status: StatusSponsorship;

  @Column({ type: 'varchar' })
  feedback_poster: string;

  @Column({ type: 'varchar' })
  feedback_godfather: string;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'datetime', default: null })
  updated_at: Date;

  @Column({ type: 'datetime', default: null })
  deleted_at: Date;
}
