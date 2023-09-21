import Person from "../../../domain/entities/users/person";
import UseCase from "../usecase";
import IPersonRepository from "../../../domain/contracts/person-repository.interface";

export namespace PersonFindAll {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IPersonRepository){}
    
        async execute(): Output {
            return await this.repo.findAll();
        }
    }
    
    export type Input = null
    
    export type Output = Promise<Person[]>
}


