import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';

@Entity('dose')
export default class DoseModel implements ModelMarker {
  @PrimaryColumn()
  id_vaccine_medicine: string;

  @Column({ type: 'integer' })
  number_dose: number;

  @Column({ type: 'datetime' })
  application_date: Date;

  @Column({ type: 'boolean', default: false })
  applied: boolean;
}