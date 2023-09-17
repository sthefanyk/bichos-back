import NotFoundError from "../../../shared/domain/errors/not-found.error";
import IUserRepository from "../../../domain/contracts/user-repository.interface";
import UseCase from "../usecase";

export namespace UserDelete {
    export class Usecase implements UseCase<Input, Output>{
        constructor(private repo: IUserRepository){}

        async execute(input: Input): Output {
            const user = await this.repo.findById(input.id);

            if (!user) {
                throw new NotFoundError("User not found");
            }

            user.deactivate();
            
            return await this.repo.update(user);
        }
    }

    export type Input = {
        id: string;
    }

    export type Output = Promise<void>
}
