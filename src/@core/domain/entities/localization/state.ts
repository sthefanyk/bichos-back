import { EntityMarker } from "src/@core/shared/domain/markers/entity.marker";
import Entity from "../../../shared/domain/entities/entity";
import { StateProps } from "./state-props";

export type StateAttr = {
    name: string;
    abbreviation: string;
    id?: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
}

export class State extends Entity<StateProps> implements EntityMarker{
    constructor(props: StateAttr) {
        super(new StateProps(props));
    }
}