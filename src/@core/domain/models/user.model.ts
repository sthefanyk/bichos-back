import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { Role } from '../../shared/domain/enums/role.enum';
import { City } from '../entities/localization/city';

@Entity('user')
export default class UserModel implements ModelMarker {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar' })
  fullName: string;

  @Column({ type: 'varchar', length: 16 })
  username: string;

  @Column({ type: 'varchar', length: 45 })
  city: City;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'simple-enum', default: Role.PERSON })
  role: Role;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'datetime', default: null })
  updated_at: Date;

  @Column({ type: 'datetime', default: null })
  deleted_at: Date;
}
