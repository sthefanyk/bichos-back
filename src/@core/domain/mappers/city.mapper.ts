import { MapperMarker } from "../../shared/domain/markers/mapper.marker";
import { City } from "../entities/localization/city";
import { State } from "../entities/localization/state";
import { CityModel } from "../models/city.model";

export class CityMapper implements MapperMarker {

    static getEntity(model: CityModel, state: State): City {
        return new City({
            name: model.name,
            state: state
        });
    }
    
    static getModel(entity: City): CityModel {
        const props = entity.getProps();
        return {
            name: props.name,
            state: props.state.getProps().name
        }
    }

}