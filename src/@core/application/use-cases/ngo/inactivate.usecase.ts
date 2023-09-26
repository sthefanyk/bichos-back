import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import UseCase from "../usecase";
import { INGORepository } from "../../../domain/contracts/ngo-repository.interface";
import { NGOUpdate } from "./update.usecase";

export namespace NGOInactivate {
    export class Usecase implements UseCase<Input, Output>{
        constructor(private repo: INGORepository){}

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

    export type Output = NGOUpdate.Output
}
