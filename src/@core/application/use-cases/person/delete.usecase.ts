import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import UseCase from "../usecase";
import { IPersonRepository } from "../../../domain/contracts/person-repository.interface";

export namespace PersonDelete {
    export class Usecase implements UseCase<Input, Output>{
        constructor(private repo: IPersonRepository){}

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
