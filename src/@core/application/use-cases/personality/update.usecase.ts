import { IPersonalityRepository } from "src/@core/domain/contracts";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import UseCase from "../usecase";
import { RequiredError } from "src/@core/shared/domain/errors/required.error";
import { AlreadyExistsError } from "src/@core/shared/domain/errors/already-exists.error";

export namespace PersonalityUpdate {
    export class Usecase implements UseCase<Input, Output>{
        constructor(private repo: IPersonalityRepository) {}

        async execute(input: Input): Output {
            await this.validate(input);
            
            const personality = await this.repo.findById(input.id);
            if (!personality) throw new NotFoundError("Personality not found");

            personality.update(input.name);
            return await this.repo.update(personality);
        }

        async validate(input: Input) {
            if(!input.name) throw new RequiredError('name');

            const personalityExists = await this.repo.findByName(input.name);
            if (personalityExists && personalityExists.id !== input.id) throw new AlreadyExistsError('Name already exists');
        }
    }

    export type Input = {
        id: string;
        name: string;
    }

    export type Output = Promise<{
        id: string;
        name: string;
    }>
}
