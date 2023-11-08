import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import NeedModel from './need.model';
import AnimalModel from './animal.model';

@Entity('animal_has_need')
export default class AnimalHasNeedModel implements ModelMarker {

    @PrimaryColumn()
    id_animal: string;
  
    @PrimaryColumn()
    id_need: string;
  
    @ManyToOne(() => AnimalModel)
    @JoinColumn({ name: 'id_animal' })
    animal: AnimalModel;
  
    @ManyToOne(() => NeedModel)
    @JoinColumn({ name: 'id_need' })
    need: NeedModel;
}
