import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { UserModel } from './user.model';

@Entity('ngo')
export class NGOModel implements ModelMarker {
  @PrimaryColumn()
  @OneToOne(() => UserModel, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  id: string;

  @Column({ type: 'varchar', length: 14, unique: true })
  cnpj: string;

  @Column({ type: 'varchar', length: 45, unique: true })
  name_ngo: string;

  @Column({ type: 'datetime' })
  date_register: Date;

  @OneToOne(() => UserModel, (user) => user.id)
  @JoinColumn({ name: 'user' })
  user: UserModel;
}
