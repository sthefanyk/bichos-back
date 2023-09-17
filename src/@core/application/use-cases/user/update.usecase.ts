import NotFoundError from "../../../shared/domain/errors/not-found.error";
import IUserRepository from "../../../domain/contracts/user-repository.interface";
import UseCase from "../usecase";

export namespace UserUpdate {
    export class Usecase implements UseCase<Input, Output>{
        constructor(private repo: IUserRepository){}

        async execute(input: Input): Output {
            const user = await this.repo.findById(input.id);

            if (!user) {
                throw new NotFoundError("User not found");
            }
            
            user.update(input.name, input.email, input.password);
            return await this.repo.update(user);
        }
    }

    export type Input = {
        id: string;
        name: string;
        email: string;
        password: string;
    }

    export type Output = Promise<void>
}
