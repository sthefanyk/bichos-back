import { IBreedRepository } from "src/@core/domain/contracts";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import UseCase from "../usecase";
import { Breed } from "src/@core/domain/entities/breed";

export namespace BreedActivate {
    export class Usecase implements UseCase<Input, Output>{
        constructor(private repo: IBreedRepository) {}

        async execute(input: Input): Output {
            const breed = await this.repo.findById(input.id);
            if (!breed) throw new NotFoundError("Breed not found");

            breed.activate();
            return await this.repo.activate(breed);
        }
    }

    export type Input = {
        id: string;
    }

    export type Output = Promise<Breed>
}
