import IUserRepository from "../../../domain/contracts/user-repository.interface";
import UserProps from "../../../domain/entities/users/user-props";
import User from "../../../domain/entities/users/user";
import UseCase from "../usecase";

export namespace UserCreate {
    export class Usecase implements UseCase<Input, Output> {
        constructor(private repo: IUserRepository){}

        async execute(input: Input): Output {
            try {
                await this.repo.findByEmail(input.email)
            } catch (_) {
                const user = new User(input);
                await user.generatePasswordHash();
                
                return await this.repo.insert(user);
            }

            throw new Error(`User using email ${input.email} already exists`);
        }
    }

    export type Input = UserProps

    export type Output = Promise<string>
}
