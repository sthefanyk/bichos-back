import { City } from "../../../domain/entities/localization/city";
import { State } from "../../../domain/entities/localization/state";
import { ILocalization } from "../../../domain/contracts/localization-repository.interface";
import { DataSource, Repository } from "typeorm";
import { StateModel } from "../../../domain/models/state.model";
import { CityModel } from "../../../domain/models/city.model";
import { StateMapper } from "../../../domain/mappers/state.mapper";
import { CityMapper } from "../../../domain/mappers/city.mapper";
import { StateInsert } from "src/@core/application/use-cases/localization/insert-state.usecase";
import { StateGetByName } from "src/@core/application/use-cases/localization/get-state-by-name.usecase";
import { CityInsert } from "src/@core/application/use-cases/localization/insert-city.usecase";

export class LocalizationTypeormRepository implements ILocalization {

    private stateRepo: Repository<StateModel>;
    private cityRepo: Repository<CityModel>;

    constructor(private dataSource: DataSource) {
        this.stateRepo = dataSource.getRepository(StateModel);
        this.cityRepo = dataSource.getRepository(CityModel);
    }

    listCities(): Promise<City[]> {
        throw new Error("Method not implemented.");
    }
    listStates(): Promise<State[]> {
        throw new Error("Method not implemented.");
    }
    getCitiesByState(state: State): Promise<City> {
        throw new Error("Method not implemented.");
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
        const result = await this.stateRepo.save(CityMapper.getModel(city));
        console.log(result);
        return {
            name: result.name,
            state: {
                name: "state name",
                abbreviation: "state abbreviation"
            }
        };
    }

    deleteState(name: string): Promise<State> {
        throw new Error("Method not implemented.");
    }
    deleteCity(name: string): Promise<City> {
        throw new Error("Method not implemented.");
    }

}