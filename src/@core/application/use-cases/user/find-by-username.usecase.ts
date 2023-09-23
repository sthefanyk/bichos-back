import UseCase from "../usecase";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import IUserRepository from "src/@core/domain/contracts/user-repository.interface";

export namespace UserFindByUsername {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IUserRepository){}
    
        async execute(input: Input): Output {
            const user = await this.repo.findByUsername(input.username);

            if (!user) {
                throw new NotFoundError("User not found");
            }

            return user;
        }
    }
    
    export type Input = {
        username: string
    }
    
    export type Output = Promise<{
        id: string;
    }>
}

