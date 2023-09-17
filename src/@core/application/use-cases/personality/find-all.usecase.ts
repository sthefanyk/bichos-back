import IPersonalityRepository from "../../../domain/contracts/personality-repository.interface";
import Personality from "../../../domain/entities/personality";
import UseCase from "../usecase";

export namespace PersonalityFindAll {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IPersonalityRepository){}
    
        async execute(): Output {
            return await this.repo.findAll();
        }
    }
    
    export type Input = null
    
    export type Output = Promise<Personality[]>
}


