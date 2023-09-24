import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { Role } from '../../shared/domain/enums/role.enum';
import { CityModel } from './city.model';

@Entity('user')
export default class UserModel implements ModelMarker {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar', length: 16, unique: true })
  username: string;

  @ManyToOne(() => CityModel, (city) => city.name)
  @JoinColumn({name: 'city_name'})
  city: CityModel;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ type: 'varchar', unique: true })
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
