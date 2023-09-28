import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { StatusPost } from 'src/@core/shared/domain/enums/status_post.enum';
import { TypePost } from 'src/@core/shared/domain/enums/type_post.enum';

@Entity('post')
export default class UserModel implements ModelMarker {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ type: 'boolean' })
  urgent: boolean;

  @ManyToOne(() => UserModel, (user) => user.id)
  @JoinColumn({name: 'user_id'})
  posted_by: UserModel;

  @Column({ type: 'number' })
  renewal_count: number;

  @Column({ type: 'simple-enum', default: StatusPost.WAITING_QUESTIONNAIRES })
  status: StatusPost;

  @Column({ type: 'simple-enum', default: TypePost.ADOPTION })
  type: TypePost;

  @Column({ type: 'varchar', default: '' })
  urgency_justification: string;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'datetime', default: null })
  updated_at: Date;

  @Column({ type: 'datetime', default: null })
  deleted_at: Date;
}
