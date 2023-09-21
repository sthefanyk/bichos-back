import Entity from "../../../shared/domain/entities/entity";
import { State } from "./state";
import { CityProps } from "./city-props";
import { EntityMarker } from "src/@core/shared/domain/markers/entity.marker";

export type CityAttr = {
    name: string;
    state: State;
    id?: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
}

export class City extends Entity<CityProps> implements EntityMarker {
    constructor(props: CityAttr) {
        super(new CityProps(props));
    }
}