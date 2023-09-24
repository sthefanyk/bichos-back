import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import UseCase from "../usecase";
import { IShelterRepository } from "../../../domain/contracts/shelter-repository.interface";
import { ShelterUpdate } from "./update.usecase";

export namespace ShelterActivate {
    export class Usecase implements UseCase<Input, Output>{
        constructor(private repo: IShelterRepository){}

        async execute(input: Input): Output {
            const user = await this.repo.findById(input.id);

            if (!user) {
                throw new NotFoundError("User not found");
            }

            user.activate();
            
            return await this.repo.update(user);
        }
    }

    export type Input = {
        id: string;
    }

    export type Output = ShelterUpdate.Output
}
