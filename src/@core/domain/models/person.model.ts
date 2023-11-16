import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import UserModel from './user.model';

@Entity('person')
export default class PersonModel implements ModelMarker {
  @PrimaryColumn()
  @OneToOne(() => UserModel, (user) => user.id)
  @JoinColumn({name: 'user_id'})
  id: string;

  @Column({ type: 'varchar', length: 11, unique: true })
  cpf: string;

  @Column({ type: 'datetime' })
  date_birth: Date;

  @OneToOne(() => UserModel, (user) => user.id)
  @JoinColumn({name: 'user'})
  user: UserModel;
}
