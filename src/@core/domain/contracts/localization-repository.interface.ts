import { StateInsert } from "src/@core/application/use-cases/localization/insert-state.usecase";
import { City } from "../entities/localization/city";
import { State } from "../entities/localization/state";
import { StateGetByName } from "src/@core/application/use-cases/localization/get-state-by-name.usecase";
import { CityInsert } from "src/@core/application/use-cases/localization/insert-city.usecase";

export interface ILocalization {

    listCities(): Promise<City[]>;
    listStates(): Promise<State[]>;

    getCitiesByState(state: State): Promise<City>;
    getStateByName(name: string): Promise<StateGetByName.Output>;

    insertState(state: State): Promise<StateInsert.Output>;
    insertCity(city: City): Promise<CityInsert.Output>;

    deleteState(name: string): Promise<State>;
    deleteCity(name: string): Promise<City>;
}