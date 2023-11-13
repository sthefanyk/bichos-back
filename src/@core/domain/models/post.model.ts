import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { StatusPost } from 'src/@core/shared/domain/enums/status_post_adopt.enum';
import { TypePost } from 'src/@core/shared/domain/enums/type_post.enum';
import UserModel from './user.model';
import AnimalModel from './animal.model';
import { CityModel } from './city.model';

@Entity('post')
export default class PostModel implements ModelMarker {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ type: 'boolean' })
  urgent: boolean;

  @ManyToOne(() => UserModel, (user) => user.id)
  @JoinColumn({name: 'user_id'})
  posted_by: UserModel;

  @Column({ type: 'integer' })
  renewal_count: number;

  @Column({ type: 'simple-enum', default: StatusPost.WAITING_QUESTIONNAIRES })
  status: StatusPost;

  @Column({ type: 'simple-enum', default: TypePost.ADOPTION })
  type: TypePost;

  @Column({ type: 'varchar', default: '' })
  urgency_justification: string;

  @Column({ type: 'varchar' })
  contact_name: string;

  @Column({ type: 'varchar' })
  contact_email: string;

  @Column({ type: 'varchar' })
  contact_phone: string;

  @ManyToOne(() => CityModel, (city) => city.name)
  @JoinColumn({name: 'city_name'})
  contact_city: CityModel;

  @OneToOne(() => AnimalModel, (animal) => animal.id)
  @JoinColumn({name: 'animal'})
  animal: AnimalModel;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'datetime', default: null })
  updated_at: Date;

  @Column({ type: 'datetime', default: null })
  deleted_at: Date;
}

