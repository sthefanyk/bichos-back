import { MapperMarker } from "src/@core/shared/domain/markers/mapper.marker";
import { State } from "../entities/localization/state";
import { StateModel } from "../models/state.model";

export class StateMapper implements MapperMarker {

    static getEntity(model: StateModel): State {

        return new State({
            name: model.name,
            abbreviation: model.abbreviation
        });
    }

    static getEntityWithJsonData(data: { name: string, abbreviation: string}): State {
        return new State({
            name: data.name,
            abbreviation: data.abbreviation
        });
    }
}