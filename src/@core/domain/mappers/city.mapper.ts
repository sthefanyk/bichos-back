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

    static getEntityWithJsonData(data: {
        name: string,
        state_name: string
        state_abbreviation: string
    }): City {
        return new City({
            name: data.name,
            state: StateMapper.getEntityWithJsonData({
                name: data.state_name,
                abbreviation: data.state_abbreviation
            })
        });
    }

}