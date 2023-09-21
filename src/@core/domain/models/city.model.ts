import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ModelMarker } from "../../shared/domain/markers/model.marker";
import { StateModel } from "./state.model";

@Entity('city')
export class CityModel implements ModelMarker {
    @PrimaryColumn({ type: 'varchar', length: 45 })
    name: string;

    @ManyToOne(() => StateModel, (state) => state.name)
    @JoinColumn({name: 'state_name'})
    state: string;
}