import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { SizeAnimal } from 'src/@core/shared/domain/enums/size-animal';
import AnimalModel from './animal.model';
import BreedModel from './breed.model';

@Entity('animal_adopt')
export default class AnimalAdoptModel implements ModelMarker {
  @PrimaryColumn()
  @OneToOne(() => AnimalModel, (animal) => animal.id)
  @JoinColumn({name: 'animal_id'})
  id: string;

  @Column({ type: 'simple-enum' })
  size_current: SizeAnimal;

  @Column({ type: 'simple-enum' })
  size_estimated: SizeAnimal;

  @OneToOne(() => BreedModel)
  @JoinColumn({name: 'breed'})
  breed: BreedModel;

  @OneToOne(() => AnimalModel)
  @JoinColumn({name: 'animal_id'})
  animal: AnimalModel;
}

