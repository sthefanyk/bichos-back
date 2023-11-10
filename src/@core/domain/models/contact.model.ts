import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { CityModel } from './city.model';

@Entity('contact')
export default class ContactModel implements ModelMarker {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @ManyToOne(() => CityModel, (city) => city.name)
  @JoinColumn({name: 'city_name'})
  city: CityModel;
}