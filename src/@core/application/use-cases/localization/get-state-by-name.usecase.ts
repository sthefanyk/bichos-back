import { ILocalization } from "src/@core/domain/contracts/localization-repository.interface";
import UseCase from "../usecase";

export namespace StateGetByName {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: ILocalization){}

        async execute(input: Input): Output {
            return await this.repo.getStateByName(input.name);
        }
    }

    export type Input = {
        name: string;
    }

    export type Output = Promise<{
        name: string;
        abbreviation: string;
    }>
}