import { City } from '../../../domain/entities/localization/city';
import { State } from '../../../domain/entities/localization/state';
import { ILocalization } from '../../../domain/contracts/localization-repository.interface';
import { DataSource, Repository } from 'typeorm';
import { StateModel } from '../../../domain/models/state.model';
import { CityModel } from '../../../domain/models/city.model';
import { StateMapper } from '../../../domain/mappers/state.mapper';
import { CityMapper } from '../../../domain/mappers/city.mapper';
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
} from 'src/@core/application/use-cases/localization';
import { NotFoundError } from 'src/@core/shared/domain/errors/not-found.error';
import { AlreadyExistsError } from 'src/@core/shared/domain/errors/already-exists.error';

export class LocalizationTypeormRepository implements ILocalization {
  private stateRepo: Repository<StateModel>;
  private cityRepo: Repository<CityModel>;

  constructor(private dataSource: DataSource) {
    this.stateRepo = dataSource.getRepository(StateModel);
    this.cityRepo = dataSource.getRepository(CityModel);
  }

  async listCities(): Promise<ListCities.Output> {
    const cities = await this.cityRepo.find();

    const ret = [];

    cities.forEach((city) => {
      ret.push(city.name);
    });

    return { cities: ret };
  }

  async listStates(): Promise<ListStates.Output> {
    const states = await this.stateRepo.find();
    return { states: states };
  }

  async getCitiesByState(state: string): Promise<GetCitiesByState.Output> {
    const stateModel = await this.getState(state);
    const cities = await this.cityRepo.find({
      where: { state: stateModel },
      relations: ['state'],
    });

    const response = [];
    cities.forEach((city) => {
      response.push(city.name);
    });

    return {
      state: {
        name: stateModel.name,
        abbreviation: stateModel.abbreviation,
      },
      cities: response,
    };
  }

  async getStateByName(name: string): Promise<StateGetByName.Output> {
    const state = await this.getState(name);

    return {
      name: state.name,
      abbreviation: state.abbreviation,
    };
  }

  async getCityByName(name: string): Promise<CityGetByName.Output> {
    const city = await this.getCity(name);
    return CityMapper.getEntity(city);
  }

  async insertState(state: State): Promise<StateInsert.Output> {
    const result = await this.stateRepo.save(StateMapper.getModel(state));
    return {
      name: result.name,
      abbreviation: result.abbreviation,
    };
  }

  async insertCity(city: City): Promise<CityInsert.Output> {
    const result = await this.cityRepo.save(CityMapper.getModel(city));
    return {
      name: result.name,
      state: {
        name: result.state.name,
        abbreviation: result.state.abbreviation,
      },
    };
  }

  async deleteState(name: string): Promise<StateDelete.Output> {
    const state = await this.getState(name);

    const cities = await this.cityRepo.find({ where: { state: state } });

    const response = [];

    cities.forEach((city) => {
        response.push(city.name);
    });

    await this.cityRepo.remove(cities);
    await this.stateRepo.delete(state);

    return {
      name: state.name,
      cities: response
    };
  }

  async deleteCity(name: string): Promise<CityDelete.Output> {
    const city = await this.getCity(name);

    await this.cityRepo.delete(city);

    return { name: city.name };
  }

  async getCity(name: string): Promise<CityModel> {
    const city = await this.cityRepo.findOne({
      where: { name },
      relations: ['state'],
    });

    return city;
  }

  async getState(name: string): Promise<StateModel> {
    const state = await this.stateRepo.findOne({ where: { name } });
    return state;
  }
}
