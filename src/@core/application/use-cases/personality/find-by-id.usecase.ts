import UseCase from "../usecase";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import { IPersonalityRepository } from "src/@core/domain/contracts";
import { Personality } from "src/@core/domain/entities/personality";

export namespace PersonalityFindById {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IPersonalityRepository){}
    
        async execute(input: Input): Output {
            const personality = await this.repo.findById(input.id);

            if (!personality) {
                throw new NotFoundError("Personality not found");
            }

            return personality;
        }
    }
    
    export type Input = {
        id: string
    }
    
    export type Output = Promise<Personality>
}