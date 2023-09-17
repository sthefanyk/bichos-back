import IUserRepository from "../../../domain/contracts/user-repository.interface";
import User from "../../../domain/entities/user";
import UseCase from "../usecase";
import NotFoundError from "../../../shared/domain/errors/not-found.error";

export namespace UserFindById {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IUserRepository){}
    
        async execute(input: Input): Output {
            const user = await this.repo.findById(input.id);

            if (!user) {
                throw new NotFoundError("User not found");
            }

            return user;
        }
    }
    
    export type Input = {
        id
    }
    
    export type Output = Promise<User>
}


