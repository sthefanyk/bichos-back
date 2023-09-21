import { City } from "../../../domain/entities/localization/city";
import { State } from "../../../domain/entities/localization/state";
import { ILocalization } from "../../../domain/contracts/localization-repository.interface";
import { DataSource, Repository } from "typeorm";
import { StateModel } from "../../../domain/models/state.model";
import { CityModel } from "../../../domain/models/city.model";
import { StateMapper } from "../../../domain/mappers/state.mapper";
import { CityMapper } from "../../../domain/mappers/city.mapper";
import { CityDelete, CityInsert, GetCitiesByState, ListCities, ListStates, StateDelete, StateGetByName, StateInsert } from "src/@core/application/use-cases/localization";

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
        cities.map((city) => {
            ret.push(city.name);
        });

        return { cities: ret }
    }

    async listStates(): Promise<ListStates.Output> {
        const states = await this.stateRepo.find();
        return { states: states }
    }

    async getCitiesByState(state: string): Promise<GetCitiesByState.Output> {
        const stateModel = await this.stateRepo.findOne({ where: { name: state }}); 
        const cities = await this.cityRepo.find({ where: { state: stateModel } });
        
        const ret = [];

        cities.map((city) => {
            ret.push(city.name);
        });
        
        return {
            state: {
                name: stateModel.name,
                abbreviaton: stateModel.abbreviation
            },
            cities: ret
        };
    }

    async getStateByName(name: string): Promise<StateGetByName.Output> {
        const state = await this.stateRepo.findOne({ where: { name } });

        return {
            name: state.name,
            abbreviation: state.abbreviation
        }
    }

    async insertState(state: State): Promise<StateInsert.Output> {
        const result = await this.stateRepo.save(StateMapper.getModel(state));
        return {
            name: result.name,
            abbreviation: result.abbreviation
        };
    }

    async insertCity(city: City): Promise<CityInsert.Output> {
        const result = await this.cityRepo.save(CityMapper.getModel(city));
        return {
            name: result.name,
            state: {
                name: result.state.name,
                abbreviation: result.state.abbreviation
            }
        };
    }

    async deleteState(name: string): Promise<StateDelete.Output> {
        const state = await this.stateRepo.findOne({  where: { name }});

        if (!state) {
            throw new Error('State not found');
        }

        const cities = await this.cityRepo.find({ where: { state: state } });
        
        const ret = [];

        cities.map((city) => {
            ret.push(city.name);
        });
        
        await this.cityRepo.remove(cities);
        const result = await this.stateRepo.delete(state);

        return {
            name: state.name,
            cities: ret,
            deleted: result.affected == 1
        }


    }

    async deleteCity(name: string): Promise<CityDelete.Output> {
        const city = await this.cityRepo.findOne({  where: { name }});

        if (!city) {
            throw new Error('City not found');
        }

        const result = await this.cityRepo.delete(city);

        return {
            name: city.name,
            deleted: result.affected == 1
        }
    }

}