import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ModelMarker } from '../../shared/domain/markers/model.marker';
import { PersonalityModel, AnimalModel } from '.';

@Entity('animal_has_personality')
export class AnimalHasPersonalityModel implements ModelMarker {
    @PrimaryColumn()
    id_animal: string;
  
    @PrimaryColumn()
    id_personality: string;
  
    @ManyToOne(() => AnimalModel)
    @JoinColumn({ name: 'id_animal' })
    animal: AnimalModel;
  
    @ManyToOne(() => PersonalityModel)
    @JoinColumn({ name: 'id_personality' })
    personality: PersonalityModel;
}
