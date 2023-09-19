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

            try {
                await this.repo.findByEmail(input.email)
            } catch (_) {
                user.update(input.name, input.email, input.password);
                await user.generatePasswordHash();
                
                return await this.repo.update(user);
            }

            throw new Error(`User using email ${input.email} already exists`);
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
