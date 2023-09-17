import IUserRepository from "../../../domain/contracts/user-repository.interface";
import UserProps from "../../../domain/entities/user-props";
import User from "../../../domain/entities/user";
import UseCase from "../usecase";

export namespace UserCreate {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IUserRepository){}

        async execute(input: Input): Output {
            const user = new User(input);
            return await this.repo.insert(user);
        }
    }

    export type Input = UserProps

    export type Output = Promise<string>
}
