import IPersonalityRepository from "../../../domain/contracts/personality-repository.interface";
import PersonalityProps from "../../../domain/entities/personality-props";
import Personality from "../../../domain/entities/personality";
import UseCase from "../usecase";

export namespace PersonalityCreate {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IPersonalityRepository){}

        async execute(input: Input): Output {
            const personality = new Personality(input);
            await this.repo.insert(personality);
        }
    }

    export type Input = PersonalityProps

    export type Output = Promise<void>
}
