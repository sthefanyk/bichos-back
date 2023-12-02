import { City } from '../entities/localization/city';
import { State } from '../entities/localization/state';

import {
  CityDelete,
  CityGetByName,
  CityInsert,
  GetCitiesByState,
  ListCities,
  ListStates,
  StateDelete,
  StateGetByName,
  StateInsert,
} from '../../application/use-cases/localization';
import { CityModel } from '../models/city.model';
import { StateModel } from '../models/state.model';

export interface ILocalization {
  listCities(): Promise<ListCities.Output>;
  listStates(): Promise<ListStates.Output>;

  getCitiesByState(state: string): Promise<GetCitiesByState.Output>;
  getStateByName(name: string): Promise<StateGetByName.Output>;
  getCityByName(name: string): Promise<CityGetByName.Output>;

  insertState(state: State): Promise<StateInsert.Output>;
  insertCity(city: City): Promise<CityInsert.Output>;

  deleteState(name: string): Promise<StateDelete.Output>;
  deleteCity(name: string): Promise<CityDelete.Output>;

  getCity(name: string): Promise<CityModel>;
  getState(name: string): Promise<StateModel>;
}
