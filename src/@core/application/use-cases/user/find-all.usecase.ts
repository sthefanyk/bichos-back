import IUserRepository from "../../../domain/contracts/user-repository.interface";
import User from "../../../domain/entities/users/user";
import UseCase from "../usecase";

export namespace UserFindAll {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IUserRepository){}
    
        async execute(): Output {
            return await this.repo.findAll();
        }
    }
    
    export type Input = null
    
    export type Output = Promise<User[]>
}


