import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { SizeAnimal } from 'src/@core/shared/domain/enums/size-animal';
import { AnimalModel, HealthModel } from '.';
import { StatusPostAdopt } from 'src/@core/shared/domain/enums/status_post_adopt.enum';

@Entity('animal_adopt')
export class AnimalAdoptModel implements ModelMarker {
  @PrimaryColumn()
  @OneToOne(() => AnimalModel, (animal) => animal.id)
  @JoinColumn({name: 'animal_id'})
  id: string;

  @Column({ type: 'enum', enum: SizeAnimal })
  size_current: SizeAnimal;

  @Column({ type: 'enum', enum: SizeAnimal })
  size_estimated: SizeAnimal;

  @Column({ type: 'varchar' })
  breed: string;

  @OneToOne(() => AnimalModel)
  @JoinColumn({name: 'animal'})
  animal: AnimalModel;

  @Column({ type: 'enum', enum: StatusPostAdopt, default: StatusPostAdopt.WAITING_QUESTIONNAIRES })
  status: StatusPostAdopt;

  @Column({ type: 'datetime' })
  update_status_at: Date;

  @OneToOne(() => HealthModel, (i) => i)
  @JoinColumn({name: 'health'})
  health: HealthModel;
}

