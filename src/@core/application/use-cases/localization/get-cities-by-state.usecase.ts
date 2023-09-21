import { ILocalization } from "src/@core/domain/contracts/localization-repository.interface";
import UseCase from "../usecase";
import { City } from "src/@core/domain/entities/localization/city";
import { CityModel } from "src/@core/domain/models/city.model";

export namespace GetCitiesByState {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: ILocalization){}

        async execute(input: Input): Output {
            return await this.repo.getCitiesByState(input.state);
        }
    }

    export type Input = {
        state: string;
    }

    export type Output = Promise<{
        state: {
            name: string
            abbreviaton: string
        }
        cities: string[]
    }>
}