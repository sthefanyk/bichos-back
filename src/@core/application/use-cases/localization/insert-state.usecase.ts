import { ILocalization } from "src/@core/domain/contracts/localization-repository.interface";
import { State } from "../../../domain/entities/localization/state";
import UseCase from "../usecase";

export namespace StateInsert {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: ILocalization){}

        async execute(input: Input): Output {
            const state = new State({
                name: input.name,
                abbreviation: input.abbreviation
            });

            return await this.repo.insertState(state);
        }
    }

    export type Input = {
        name: string;
        abbreviation: string;
    }

    export type Output = Promise<{
        name: string;
        abbreviation: string;
    }>
}