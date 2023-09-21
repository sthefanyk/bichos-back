import { StateInsert } from "src/@core/application/use-cases/localization/insert-state.usecase";
import { City } from "../entities/localization/city";
import { State } from "../entities/localization/state";
import { StateGetByName } from "src/@core/application/use-cases/localization/get-state-by-name.usecase";
import { CityInsert } from "src/@core/application/use-cases/localization/insert-city.usecase";
import { GetCitiesByState } from "src/@core/application/use-cases/localization/get-cities-by-state.usecase";
import { ListStates } from "src/@core/application/use-cases/localization/list-states.usecase";
import { ListCities } from "src/@core/application/use-cases/localization/list-cities.usecase";
import { StateDelete } from "src/@core/application/use-cases/localization/delete-state.usecase";
import { CityDelete } from "src/@core/application/use-cases/localization/delete-city.usecase";

export interface ILocalization {

    listCities(): Promise<ListCities.Output>;
    listStates(): Promise<ListStates.Output>;

    getCitiesByState(state: string): Promise<GetCitiesByState.Output>;
    getStateByName(name: string): Promise<StateGetByName.Output>;

    insertState(state: State): Promise<StateInsert.Output>;
    insertCity(city: City): Promise<CityInsert.Output>;

    deleteState(name: string): Promise<StateDelete.Output>;
    deleteCity(name: string): Promise<CityDelete.Output>;
}