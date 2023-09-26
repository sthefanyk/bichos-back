import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import UserModel from './user.model';

@Entity('shelter')
export default class ShelterModel implements ModelMarker {
  @PrimaryColumn()
  @OneToOne(() => UserModel, (user) => user.id)
  @JoinColumn({name: 'user_id'})
  id: string;

  @Column({ type: 'varchar', length: 11, unique: true })
  responsible_cpf: string;

  @Column({ type: 'varchar' })
  responsible_date_birth: Date;

  @Column({ type: 'varchar' })
  name_shelter: string;

  @Column({ type: 'varchar' })
  star_date_shelter: Date;

  @OneToOne(() => UserModel, (user) => user.id)
  @JoinColumn({name: 'user'})
  user: UserModel;
}
