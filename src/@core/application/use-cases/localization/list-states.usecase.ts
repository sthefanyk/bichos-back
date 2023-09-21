import { ILocalization } from "src/@core/domain/contracts/localization-repository.interface";
import UseCase from "../usecase";
import { City } from "src/@core/domain/entities/localization/city";
import { CityModel } from "src/@core/domain/models/city.model";

export namespace ListStates {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: ILocalization){}

        async execute(input: Input): Output {
            return await this.repo.listStates();
        }
    }

    export type Input = void
    export type Output = Promise<{
        states: {
            name: string,
            abbreviation: string
        }[]
    }>
}