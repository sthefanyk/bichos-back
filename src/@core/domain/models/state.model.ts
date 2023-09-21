import { Column, Entity, PrimaryColumn } from "typeorm";
import { ModelMarker } from "../../shared/domain/markers/model.marker";

@Entity('state')
export class StateModel implements ModelMarker {
    @PrimaryColumn({ type: 'varchar', length: 45 })
    name: string;
  
    @Column({ type: 'varchar', length: 2 })
    abbreviation: string;
}