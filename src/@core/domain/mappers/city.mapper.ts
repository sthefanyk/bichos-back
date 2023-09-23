import { MapperMarker } from "../../shared/domain/markers/mapper.marker";
import { City } from "../entities/localization/city";
import { CityModel } from "../models/city.model";
import { StateMapper } from "./state.mapper";

export class CityMapper implements MapperMarker {

    static getEntity(model: CityModel): City {
        return new City({
            name: model.name,
            state: StateMapper.getEntity(model.state)
        });
    }
    
    static getModel(entity: City): CityModel {
        const props = entity.getProps();
        const model = {
            name: props.name,
            state: StateMapper.getModel(props.state)
        }

        return model
    }

}