import { ILocalization } from "src/@core/domain/contracts/localization-repository.interface";
import UseCase from "../usecase";
import { NotFoundError } from "src/@core/shared/domain/errors/not-found.error";

export namespace GetCitiesByState {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: ILocalization){}

        async execute(input: Input): Output {
            input.state = input.state.toUpperCase();
            if (!await this.repo.getState(input.state)) throw new NotFoundError('State not found');
            return await this.repo.getCitiesByState(input.state);
        }
    }

    export type Input = {
        state: string;
    }

    export type Output = Promise<{
        state: {
            name: string
            abbreviation: string
        }
        cities: string[]
    }>
}